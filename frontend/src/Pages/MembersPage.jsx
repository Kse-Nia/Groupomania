import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import UserMap from "../Components/Members/UserMap";

const MembersPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main>
        <UserMap />
      </main>
    </React.Fragment>
  );
};

export default MembersPage;
