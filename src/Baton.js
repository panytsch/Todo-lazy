import React, { Component } from "react";

const Baton = ({ color, display, children, onClick }) => {
  return (
    <button
      style={{
        backgroundColor: color || "green",
        borderRadius: "6px",
        margin: "10px",
        font: "15px/20px Arial, sans-serif",
        display: display ? "inline-block" : "none"
      }}
      children={children}
      onClick={onClick}
    />
  );
};

export default Baton;
