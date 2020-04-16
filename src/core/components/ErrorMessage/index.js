import React from "react";
import Announcement from "@material-ui/icons/Announcement";
import "./style.css";

export default function ErrorMessage() {
  return (
    <div className="error-message">
      <Announcement></Announcement>
      <p className="error-message__text">
        Ocurrio un error interno, intenta mas tarde.
      </p>
    </div>
  );
}
