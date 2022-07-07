import React from "react";

import Navbar from "../Components/Navbar/Navbar";
import ProfileRender from "../Components/Profile/ProfileRender";

const ProfilePage = () => {
  return (
    <React.Fragment>
      <div>
        <Navbar />
        <ProfileRender />
      </div>
    </React.Fragment>
  );
};

export default ProfilePage;
