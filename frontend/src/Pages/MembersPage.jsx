import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Users from "../Components/Members/Users";

const MembersPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main>
        <Users />
      </main>
    </React.Fragment>
  );
};

export default MembersPage;
