import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    hobbies,
    user: { name },
  },
}) => (
  <div className="profile-about border-gold">
    {bio && (
      <>
        <h2>{name.trim().split(" ")[0]}s Bio</h2>
        <p>{bio}</p>
        <div className="line" />
      </>
    )}
    <h2>Hobbies</h2>
    <div className="hobbies">
      {hobbies.map((hob, index) => (
        <div key={index}>{hob}</div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
