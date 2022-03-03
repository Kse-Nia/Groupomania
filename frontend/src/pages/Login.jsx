import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

import "./pages.css";

function Login() {
  return (
    <div className="wrapcontainer">
      <LoginForm />
    </div>
  );
}

export default Login;
