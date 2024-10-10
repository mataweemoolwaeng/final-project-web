import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import "./assets/fonts/kanit/Kanit-Light.ttf";
import "./assets/fonts/kanit/Kanit-Black.ttf";
import "./assets/fonts/kanit/Kanit-Bold.ttf";
import "./assets/fonts/kanit/Kanit-ExtraBold.ttf";
import "./assets/fonts/kanit/Kanit-ExtraLight.ttf";
import "./assets/fonts/kanit/Kanit-Italic.ttf";
import "./assets/fonts/kanit/Kanit-Medium.ttf";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
