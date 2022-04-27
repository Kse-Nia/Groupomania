import React, { useContext } from "react";
import Log from "../Components/Log/Log";
import { UidContext } from "../Components/AppContext";

const Profile = () => {
  const uid = useContext(UidContext); // import Hook

  return (
    <div className="page-profile">
      {uid ? (
        <h1>Update Page</h1>
      ) : (
        <div className="logContainer">
          <Log signin={false} signup={true} />
        </div>
      )}
    </div>
  );
};

export default Profile;
