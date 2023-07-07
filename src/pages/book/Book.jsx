import "./Book.css";
import React, { useEffect, useState } from "react";
import { ReactComponent as LinkArrow } from "./../../assets/icons/arrow-right-up-line.svg";
import { ReactComponent as BookmarkIcon } from "./../../assets/icons/bookmark-line.svg";
import { ReactComponent as ShareIcon } from "./../../assets/icons/share-line.svg";
import { ReactComponent as DownloadIcon } from "./../../assets/icons/skip-down-line.svg";
import Heading2 from "../../components/typography/Heading2";
import Caption from "../../components/typography/Caption";

import { useParams } from 'react-router';
import { useStateValue } from "../../StateProvider";
import LoadingWidget from "../../components/widgets/LoadingWidget";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";


function Book() {
  
  const [{books,user}, dispatch] = useStateValue();
  const params= useParams()
  
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);

  useEffect(() => {

    const getBook = async () => {
      const bookData = await getDoc(
      doc(db, `/books/${params.id}`)
      );
      const book = bookData.data();
        setBook(book)
        console.log('hhh')
        console.log(bookData.data())
        console.log(book)
        setLoading(false)
    }

    if (books[params.id]!==undefined) {
      setBook(books[params.id])
      setLoading(false)
    } else {
      getBook()
      console.log(book)
    }
  }, [loading])
  if (!book) {
    return <LoadingWidget/>
  }

  const addToCart = () => {
    const map = new Map();
    map.set(book.id, 1)
    dispatch({
      type: 'ADD_TO_CART',
      cart: map
    })
    console.log(map)
  }

  return (
    <div className="bookdetail page">
      <div className="bookdetail__top">
        <img
          src={book.cover_url}
          alt=""
          className="bookdetail__cover"
        />
        <div className="bookdetail__meta">
          <div>
            <h1 className="bookdetail__title">
            {book.title}
            </h1>
            <Heading2 className="mb-1">{book.author}</Heading2>
            <Caption>
              Get ready to uncover the dark secrets and betrayals in the book. A
              thrilling adventure awaits you.
            </Caption>
          </div>
          <div className="bookdetail__buttons">
            <button onClick={addToCart} className="button bookdetail__button">
              Add to Cart <LinkArrow className="bookdetail__button--icon" />
            </button>
            <div className="bookdetail__actions">
              <BookmarkIcon className="bookdetail__action--icon" />
              <ShareIcon className="bookdetail__action--icon" />
              <DownloadIcon className="bookdetail__action--icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="bookdetail__bottom">
        <div className="bookdetail__left">
          <Heading2 className="mb-1">Description</Heading2>
          <Caption className="bookdetail__caption">
            {book.description}
          </Caption>
        </div>
        <div className="bookdetail__right">
          <Heading2 className="mb-1">Editors</Heading2>
          <Caption className="bookdetail__caption">{book.subject_people}</Caption>
          <Heading2 className="mb-1">Language</Heading2>
          <Caption className="bookdetail__caption">{book.language}</Caption>
          <Heading2 className="mb-1">Editors</Heading2>
          <Caption className="bookdetail__caption">
            Edition: {book.edition}, {book.pages} pages
            <br />
            ISBN {book.ISBN}
          </Caption>
          <Heading2>No. of Copies: {book.copies}</Heading2>
        </div>
      </div>
    </div>
  );
}

export default Book;
