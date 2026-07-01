import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { WishlistProvider } from "./context/WishlistContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <WishlistProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </WishlistProvider>
    </AuthProvider>
  </BrowserRouter>
);