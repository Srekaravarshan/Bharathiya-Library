import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "./../../assets/icons/search-2-line.svg";
import "./Search.css";
import { db } from "../../firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import Caption from "../../components/typography/Caption";
import Heading2 from "../../components/typography/Heading2";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sres, setSres] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [{}, dispatch] = useStateValue();

  const handleOnChange = async (e) => {
    setSearchTerm(e.target.value);
    try {
      const q = query(
        collection(db, "books"),
        where("searchKeywords", "array-contains", e.target.value.toLowerCase()),
        limit(5)
      );

      const querySnapshot = await getDocs(q);

      const results = [];
      const sre = {};
      querySnapshot.docs.map((doc) => {
        sre[doc.id] = doc.data()
        results.push(doc.data());
      });
      setSuggestions(results);
      setSres({...sres, ...sre});
    } catch (error) {
      window.alert("Error searching books:", error);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setSearchTerm(suggestion);
    setSearchResults([]);
    setSuggestions([]);

    try {
      const q = query(
        collection(db, "books"),
        where("title", "==", suggestion)
      );

      const querySnapshot = await getDocs(q);
      const books = {};
      const results = [];
      querySnapshot.docs.map((doc) => {
        books[doc.data().id] = doc.data();
        results.push(doc.data());
      });
      setSearchResults(results);

      dispatch({
        type: "ADD_BOOKS",
        books: books,
      });
    } catch (error) {
      window.alert("Error searching books:", error);
    }
  };

  function search(e) {
    console.log("hello");
    if (e.key === "Enter") {
      // handleSearch();
    }
  }

  return (
    <div
      className="search page"
      onClick={(e) => {
        if (!e.target.classList.contains("no-close")) setShowSuggestions(false);
        else setShowSuggestions(true);
      }}
    >
      <div className="search__page">
        <div className="search__container">
          <SearchIcon className="home__search--icon" />
          <input
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => search(e)}
            type="text"
            value={searchTerm}
            onChange={(e) => handleOnChange(e)}
            className="home__search no-close"
            placeholder="Search book name, author"
          />
        </div>
        {showSuggestions == true && (
          <div className="suggestions">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.title}
                className="suggestion"
                onClick={() => handleSuggestionClick(suggestion.title)}
              >
                {suggestion.title}
              </li>
            ))}
          </div>
        )}
        <div className="center">
        <div className="result__books">
          {Object.values(sres).map((book) => (
            <Link to={`/books/${book.id}`} className="result__book">
              <img
                src={book.cover_url}
                alt=""
                className="result__book--cover"
              />
              <Heading2 className="result__book--title">{book.title}</Heading2>
            </Link>
          ))}
        </div>
    </div>
      </div>
      </div>
  );
}

export default Search;
