import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import AppLayout from "./pages/layout/AppLayout";
import HomePage from "./pages/home/HomePage";
import { gsap, Power3 } from "gsap";
import Books from "./pages/books/Books";
import Book from "./pages/book/Book";
import Settings from "./pages/settings/Settings";
import { useEffect, useState } from "react";
import { authentication, db, onAuthStateChangedV } from "./firebase";
import { useStateValue } from "./StateProvider";
import { PrivateRoute } from "./components/wrapper/PrivateRoute";
import Loading from "./pages/loading/Loading";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Cart from "./pages/cart/Cart";
import Search from "./pages/search/Search";

function App() {
  const [{ books }, dispatch] = useStateValue();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var user = null;
    onAuthStateChangedV(authentication, async (userData) => {
      user = userData;
      if (user) {
        const userDoc = await getDoc(doc(db, `/users/${user.uid}`));

        dispatch({
          type: "SET_USER",
          user: userDoc.data(),
        });
        setAuthenticated(true);
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        setAuthenticated(false);
      }
    });
    const getPopularBooks = async () => {
      const snapshot = await getDoc(doc(db, "/recommendations/popular_now"));

      const popularBooks = {};
      for (var i = 0; i < snapshot.data().books.length; i++) {
        const book = await getDoc(
          doc(db, `/books/${snapshot.data().books[i]}`)
        );
        popularBooks[book.id] = book.data();
      }
      dispatch({
        type: "SET_POPULAR_BOOKS",
        popularBooks: popularBooks,
      });
      dispatch({
        type: "ADD_BOOKS",
        books: popularBooks,
      });
      setLoading(false);
    };
    getPopularBooks();
    return () => {};
  }, [loading]);

  let tl = new gsap.timeline();
  let ease = Power3.easeOut();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<LoginPage />} />
          <Route path="/" element={<AppLayout timeline={tl} ease={ease} />}>
            <Route path="" element={<HomePage />}></Route>
            <Route path="books" element={<Books />}></Route>
            <Route path="books/:id" element={<Book />}></Route>
            <Route path="search" element={<Search />}></Route>
          <Route path="login" element={<LoginPage />} />
            <Route
              path="cart"
              element={
                <PrivateRoute isLoggedIn={authenticated}>
                  <Cart />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="settings"
              element={
                  <Settings />
              }
            />
          </Route>
          <Route path="/*" element={<h1>404</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
