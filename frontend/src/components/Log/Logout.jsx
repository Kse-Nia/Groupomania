import React from "react";
import cookie from "js-cookie";
import axios from "axios";
import Logout from "../Assets/logout.svg";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <li onClick={logout}>
      <img src={Logout} alt="logout" />
    </li>
  );
};

export default Logout;