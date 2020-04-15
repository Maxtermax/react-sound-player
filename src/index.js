import React from "react";
import ReactDOM from "react-dom";
import "@/styles/normalize.css";
import App from "@/core/components/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
