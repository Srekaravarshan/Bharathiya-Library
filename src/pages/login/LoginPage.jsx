import React from "react";
import "./LoginPage.css";
import { ReactComponent as GoogleIcon } from "../../assets/icons/google-fill.svg";
import { Link } from "react-router-dom";
import Divider from "../../components/widgets/Divider";

function LoginPage() {
  return (
    <div className="login__page">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    <div className="login">
      <div className="login__form">
        <form action="#">
          <Link to="/" className="logo link">
            Bharathiya <span>Library</span>
          </Link>
          <input
            className="input login__form--input"
            placeholder="Email"
            type="email"
          />
          <input
            className="input login__form--input"
            placeholder="Password"
            type="password"
          />
          <button className="button login__form--submit" type="submit">
            Login
          </button>
        </form>
        <Divider/>
        <button className="button login__google">
          <GoogleIcon className="login__google--icon" />
          Signin with Google
        </button>
        <Divider/>
        <Link className="link register__link" to="/register">
          Already have an account, Register
        </Link>
      </div>
    </div>
    </div>
  );
}

export default LoginPage;
