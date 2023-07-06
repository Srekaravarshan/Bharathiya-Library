import React from 'react'

function Heading(props) {
    const headingStyle ={
        fontSize: "1.2rem",
      fontWeight: "500"
    }
  return (
    <h2 className={props.className} style={headingStyle}>{props.children}</h2>
  )
}

export default Heading