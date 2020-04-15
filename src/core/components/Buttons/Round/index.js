import React from "react";
import "./style.css";

export default function Round({ children, ...rest }) {
  return (
    <button className={"btn-round"} {...rest}>
      {children}
    </button>
  );
}
