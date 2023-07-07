import React from "react";

function Caption(props) {
  const captionStyle = {
    fontFamily: "Montserrat",
    display: 'block',
    textAlign: 'start',
    fontSize: "0.7rem",
    fontWeight: 500,
  };

  return (
    <p style={captionStyle} className={props.className}>
      {props.children}
    </p>
  );
}

export default Caption;
