import React, { useState } from "react";
import "./LoginPage.css";
import { ReactComponent as GoogleIcon } from "../../assets/icons/google-fill.svg";
import Divider from "../../components/widgets/Divider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as AccountIcon } from "./../../assets/icons/account-circle-line.svg";

import {
  authentication,
  signInWithGoogle,
  createUserWithEmailAndPasswordV,
  signInWithEmailAndPasswordV,
  signInWithPopup,
  googleAuthProvider,
  db,
  signOutV,
} from "./../../firebase";
import Caption from "../../components/typography/Caption";
import Heading2 from "../../components/typography/Heading2";
import { doc, setDoc } from "firebase/firestore";
import { useStateValue } from "../../StateProvider";
import Heading from "../../components/typography/Heading";

function LoginPage() {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(false);

  const location = useLocation();

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const signIn = (e) => {
    e.preventDefault();
    sessionStorage.setItem("beforeLogin", location.state?.from?.pathname);
  };

  const register = (e) => {
    e.preventDefault();

    sessionStorage.setItem("beforeLogin", location.state?.from?.pathname);
    if (isLogin) {
      signInWithEmailAndPasswordV(authentication, email, password)
        .then((user) => {
          const beforeLoginUrl = sessionStorage.getItem("beforeLogin");
          sessionStorage.removeItem("beforeLogin");
          if (beforeLoginUrl !== undefined && beforeLoginUrl !== "undefined") {

            navigate(beforeLoginUrl);
          } else if (location.state?.from) {
            navigate(beforeLoginUrl);
          } else {
            navigate("/");
          }
        })
        .catch((error) => alert(error.message));
    } else {
      createUserWithEmailAndPasswordV(authentication, email, password)
        .then(async (user) => {
          // it successfully created a new user with email and password
          const uid = uuidv4();
          if (user) {
            const userData = {
              username: null,
              uid: uid,
              profile: null,
              email: email,
              phone: null,
            };
            await setDoc(doc(db, "users", uid), userData);

            dispatch({
              type: "SET_USER",
              user: userData,
            });
            const beforeLoginUrl = sessionStorage.getItem("beforeLogin");
            sessionStorage.removeItem("beforeLogin");
            if (
              beforeLoginUrl !== undefined &&
              beforeLoginUrl !== "undefined"
            ) {
              navigate(beforeLoginUrl);
            } else {
              navigate("/");
            }
          }
        })
        .catch((error) => alert(error.message));
    }
  };
  const googleSignIn = async (e) => {
    sessionStorage.setItem("beforeLogin", location.state?.from?.pathname);

    const beforeLoginUrl = sessionStorage.getItem("beforeLogin");
    sessionStorage.removeItem("beforeLogin");

    await signInWithPopup(authentication, googleAuthProvider)
      .then(async (result) => {
        const userData = {
          username: result.user.displayName,
          uid: result.user.uid,
          profile: result.user.photoURL,
          email: result.user.email,
          phone: result.user.phoneNumber,
        };
        await setDoc(doc(db, "users", result.user.uid), userData);

        dispatch({
          type: "SET_USER",
          user: userData,
        });
        if (beforeLoginUrl !== undefined && beforeLoginUrl !== "undefined") {

          navigate(beforeLoginUrl);
        } else {
          navigate("/");
        }
        // }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="login__page">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      {/* <div className="login"> */}
        {user ? (
          <div className="login__user">
                <Link to="/" className="logo link">
                  Bharathiya <span>Library</span>
                </Link>
            <div className="login__user--top">
              {user.profile ? (
                <img
                  src={user.profile}
                  alt=""
                  className="layout__profile--image"
                />
              ) : (
                null
              )}
              <div className="login__user--name">
                
              {user.username ? <Heading2>{user.username}</Heading2> : null}
              <Heading2 className="login__user--email">{user.email}</Heading2>
              </div>
            </div>
            <button onClick={async () => {
                  await signOutV(authentication).then(()=>{

        dispatch({
          type: "SET_USER",
          user: null,
        });
                  }).catch((err)=> window.alert(err));
                  
                  }}  className="button login__user--button">Sign out</button>
          </div>
        ) : (
      <div className="login">

          <div>
            <div className="login__form">
              <form onSubmit={register}>
                <Link to="/" className="logo link">
                  Bharathiya <span>Library</span>
                </Link>
                <input
                  className="input login__form--input"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="input login__form--input"
                  placeholder="Password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={register} className="button login__form--submit" type="submit">
                  {isLogin ? "Login" : "Register"}
                </button>
              </form>
              <Divider />
              <button onClick={googleSignIn} className="button login__google">
                <GoogleIcon className="login__google--icon" />
                Signin with Google
              </button>
              <Divider />
              <div
                className="link register__link"
                onClick={toggleLogin}
                to="/register"
              >
                {isLogin
                  ? "New to Bharathiya Library, Register"
                  : "Already have an account, Login"}
              </div>
            </div>
            
          </div>
          </div>
        )}
      </div>
    // </div>
  );
}

export default LoginPage;
