import React from 'react'

function Divider() {
    const dividerStyle = {
        margin: "20px 0",
        width: "100%",
        height: "1px",
        backgroundColor: "var(--gray)",
        borderRadius: "10px",
    }
  return (
    <div style={dividerStyle} className="divider" />
  )
}

export default Divider