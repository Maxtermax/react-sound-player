import React from "react";
import useStyle from "./style.js";

export default function PlaceCenter({ children }) {
  const classes = useStyle();
  return <div className={classes.container}>{children}</div>;
}
