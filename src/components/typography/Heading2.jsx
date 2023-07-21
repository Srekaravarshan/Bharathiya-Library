import React from "react";
import './Heading2.css';

function Heading2(props) {

  return <h2 className={props.className + " heading2"}>{props.children}</h2>;
}

export default Heading2;
