import "./Books.css";
import { ReactComponent as LinkArrow } from "./../../assets/icons/arrow-right-up-line.svg";
import { ReactComponent as Search } from "./../../assets/icons/search-2-line.svg";
import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/widgets/Header";
import Loading from "../loading/Loading";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { Link } from "react-router-dom";

function Books() {
  let title = useRef();
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {

    const getPopularBooks = async () => {
      try {
        const countDoc = await getDoc(doc(db, '/books/count'));
        setTotalBooks(countDoc.data().count);
        
        let q;
        q = query(collection(db, '/books'), orderBy('title'), limit(10))
        const snapshot = await getDocs(q);

        const popularBooks = {};
        const results = [];

        snapshot.docs.map((doc) => {
          popularBooks[doc.data().id] = doc.data()
          results.push(doc.data());
        });

        setBooks(results)

        dispatch({
          type: "ADD_BOOKS",
          books: popularBooks,
        });
        setLoading(false);
      } catch (err) { window.alert(err.message) }
    };
    getPopularBooks();
    return () => { };
  }, [loading]);

  if (loading) {
    return <Loading />
  }

  const loadmore  = async () => {
    let q;
    q = query(collection(db, '/books'), orderBy('title'), limit(totalBooks - books.length > 10 ? 10 : totalBooks-books.length), startAfter(books[books.length-1].title))
        const snapshot = await getDocs(q);

        const popularBooks = {};
        const results = [...books];

        snapshot.docs.map((doc) => {
          popularBooks[doc.data().id] = doc.data()
          results.push(doc.data());
        });

        setBooks(results)

        dispatch({
          type: "ADD_BOOKS",
          books: popularBooks,
        });

  }

  return (
    <div className="books page">
      <header className="books__header">
        <div className="books__header--left">
          <Header title="Keep the story going..." />
        </div>
        <div className="books__header--right">
          <div className="books__person">
            <img
              src="assets/images/person.jpg"
              alt=""
              className="books__person--image"
            />
            <div className="books__person--meta">
              <h4 className="books__person--name">Srekaravarshan N K</h4>
              <caption className="books__person--role">Author - <i>reallyy!</i></caption>
            </div>
          </div>

          <blockquote className="books__person--caption">
            "Books are like magic wands – they whisk you away to fantastical worlds, make you laugh out loud in public, and occasionally hit you on the head when you fall asleep reading in bed!" 📚✨😄
          </blockquote>
        </div>
      </header>
      <div>
        <p className="books__footer--number">
          <span>{books.length + " of " + totalBooks}</span>books
        </p>
        <div className="book__cards">

          {books.map((book) => (
            <Link to={`/books/${book.id}`} className="book__card">
              <img
                className="book__card--cover"
                src={book.cover_url}
                alt=""
              />
              <caption className="book__name">{book.title}</caption>
            </Link>

          ))}
          {
            (books.length < totalBooks) && 
            <button onClick={loadmore} className="button books__loadmore">Load More</button>
          }

        </div>
        <div className="books__footer">
          <p className="books__footer--info">
            🛈 Got chance to out the new collection of Harry Potter? It's a must read for any fan of the series, don't miss out!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Books;
