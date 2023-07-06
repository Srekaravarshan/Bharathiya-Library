import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import AppLayout from "./pages/layout/AppLayout";
import HomePage from "./pages/home/HomePage";
import { gsap, Power3 } from "gsap";
import Books from "./pages/books/Books";
import Book from "./pages/book/Book";

function App() {

  let tl = new gsap.timeline();
  let ease = Power3.easeOut();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/"  element={<AppLayout timeline={tl} ease={ease}/>}>
            <Route path="" element={<HomePage />}></Route>
            <Route path="books" element={<Books/>}></Route>
            <Route path="books/:id" element={<Book/>}></Route>
            <Route path="bookmarks" element={<h1 style={{margin:"25px"}}>Bookmarks</h1>}></Route>
            <Route path="settings" element={<h1 style={{margin:"25px"}}>Settings</h1>}></Route>
          </Route>
          <Route path="/*" element={<h1>404</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
