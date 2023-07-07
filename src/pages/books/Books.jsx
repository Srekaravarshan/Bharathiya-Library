import "./Books.css";
import { ReactComponent as LinkArrow } from "./../../assets/icons/arrow-right-up-line.svg";
import { ReactComponent as Search } from "./../../assets/icons/search-2-line.svg";
import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import Header from "../../components/widgets/Header";

function Books() {
  let title = useRef();
  let tl = new gsap.timeline({ repeat: -1 });

  useEffect(() => {
    tl.to(title, 15, {
      backgroundPosition: "-960px 0",
      ease: "linear",
    });
  });
  return (
    <div className="books page">
      <header className="books__header">
        <div className="books__header--left">
        <Header title="Keep the story going..."/>
          {/* <h1 ref={(el) => (title = el)} className="title">
            Keep the story going...
          </h1>
          <blockquote className="home__quote">
            “I kept always two books in my pocket, one to read, one to write
            in.”
            <span className="home__quote--author">
              - Robert Louis Stevenson
            </span>
          </blockquote>
          <button className="home__start-read button">
            Start Reading
            <LinkArrow className="home__start-read--icon" />
          </button> */}
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
              <caption className="books__person--role">Author</caption>
            </div>
            </div>

            <blockquote className="books__person--caption">
              "Lorem ipsum dolor" sit, amet consectetur adipisicing elit. Ratione,
              expedita excepturi. Illum iure porro eaque obcaecati, distinctio
              placeat ab consectetur perferendis amet.
            </blockquote>
          </div>
      </header>
      <div className="book__cards">
        <div className="book__card">
          <img
            className="book__card--cover"
            src="\assets\bookcovers\Snow College Theatre Posters.png"
            alt=""
          />
          <caption className="book__name">Into the Woods</caption>
        </div>
        <div className="book__card">
          <img
            className="book__card--cover"
            src="\assets\bookcovers\Snow College Theatre Posters.png"
            alt=""
          />
          <caption className="book__name">Into the Woods</caption>
        </div>
        <div className="book__card">
          <img
            className="book__card--cover"
            src="\assets\bookcovers\Snow College Theatre Posters.png"
            alt=""
          />
          <caption className="book__name">Into the Woods</caption>
        </div>
        <div className="book__card">
          <img
            className="book__card--cover"
            src="\assets\bookcovers\Snow College Theatre Posters.png"
            alt=""
          />
          <caption className="book__name">Into the Woods</caption>
        </div>
        <div className="book__card">
          <img
            className="book__card--cover"
            src="\assets\bookcovers\Snow College Theatre Posters.png"
            alt=""
          />
          <caption className="book__name">Into the Woods</caption>
        </div>
        <div className="book__card">
          <img
            className="book__card--cover"
            src="\assets\bookcovers\Snow College Theatre Posters.png"
            alt=""
          />
          <caption className="book__name">Into the Woods</caption>
        </div>
        <div className="book__card">
          <img
            className="book__card--cover"
            src="\assets\bookcovers\Snow College Theatre Posters.png"
            alt=""
          />
          <caption className="book__name">Into the Woods</caption>
        </div>
      </div>
      <div className="books__footer">
        <p className="books__footer--info">
        🛈 Got chance to out the new collection of Harry Potter? It's a must read for any fan of the series, don't miss out!
        </p>
        <p className="books__footer--number">
            <span>60</span>books
        </p>
      </div>
    </div>
  );
}

export default Books;
