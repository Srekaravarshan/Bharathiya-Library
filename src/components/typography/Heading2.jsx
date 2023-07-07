import React from "react";

function Heading2(props) {
  const heading2Style = {
    fontFamily: "Montserrat",
    fontSize: "0.8rem",
    fontWeight: "bold",
  };

  return <h2 className={props.className} style={heading2Style}>{props.children}</h2>;
}

export default Heading2;
