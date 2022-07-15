import React from "react";

const ProfileAvatar = (props) => {
  return (
    <div className={`profile-avatar ${props.class}`}>
      <img src={props.imageUrl} alt="profil picture" className="avatar" />
    </div>
  );
};

export default ProfileAvatar;
