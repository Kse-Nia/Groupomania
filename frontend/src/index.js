import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "../src/Context/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />{" "}
        </Routes>{" "}
      </AuthProvider>{" "}
    </BrowserRouter>{" "}
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
