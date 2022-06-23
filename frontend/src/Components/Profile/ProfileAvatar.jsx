import React from "react";

const ProfileAvatar = (props) => {
  return (
    <div className={`profile-avatar ${props.class}`}>
      <img src={props.imageUrl} alt="profil picture" className="avatar" />
      {/*   <Avatar
          src={props.photo}
          alt="profil picture"
          className="avatar"
          sx={{ width: 80, height: 80 }}
        /> */}
    </div>
  );
};

export default ProfileAvatar;
