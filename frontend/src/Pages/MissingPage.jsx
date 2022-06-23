import React from "react";
import ErrorPicture from "../Assets/404.jpg";

const MissingPage = () => {
  return (
    <div>
      <img src={ErrorPicture} alt="" />
    </div>
  );
};

export default MissingPage;
