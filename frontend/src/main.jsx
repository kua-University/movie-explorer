import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

// Configure axios base URL for production backend connection
if (import.meta.env.VITE_API_URL) {
  const url = import.meta.env.VITE_API_URL;
  axios.defaults.baseURL = url.endsWith('/') ? url : `${url}/`;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);