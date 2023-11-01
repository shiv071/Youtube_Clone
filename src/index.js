import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { AppContext } from "./context/ContextApi";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContext>
  </React.StrictMode>
);
