import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import "./index.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreProvider>
      <App />
    </StoreProvider>
  </BrowserRouter>
);