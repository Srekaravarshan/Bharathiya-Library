import React, { useEffect } from "react";
import { ReactComponent as LinkArrow } from "./../../assets/icons/arrow-right-up-line.svg";
import ImageHeader from "../typography/ImageHeader";


function Header(props) {
    
  return (
    <header className={props.className}>
     <ImageHeader>{props.title}</ImageHeader>
      <blockquote className="home__quote">
        “I kept always two books in my pocket, one to read, one to write in.”
        <span className="home__quote--author">- Robert Louis Stevenson</span>
      </blockquote>
      <button className="home__start-read button">
        Start Reading
        <LinkArrow className="home__start-read--icon" />
      </button>
    </header>
  );
}

export default Header;
