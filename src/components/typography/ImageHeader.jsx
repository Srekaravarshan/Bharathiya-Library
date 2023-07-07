import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import './ImageHeader.css'

function ImageHeader(props) {
  let title = useRef();
  let tl = new gsap.timeline({ repeat: -1 });
  useEffect(() => {
    tl.to(title, 15, {
      backgroundPosition: "-960px 0",
      ease: "linear",
    });
  });


  return (
    <h1 className={props.className + " image-header"} ref={(el) => (title = el)} >
      {props.children}
    </h1>
  );
}

export default ImageHeader;
