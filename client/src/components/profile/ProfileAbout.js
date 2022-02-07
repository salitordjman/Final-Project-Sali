import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    hobbies,
    user: { name },
  },
}) => (
  <div>
    {bio && (
      <>
        <h2>{name.trim().split(" ")[0]}s Bio</h2>
        <p>{bio}</p>
      </>
    )}
    <h2>hobbies Set</h2>
    <div>
      {hobbies.map((hob, index) => (
        <div key={index}>
          <i /> {hob}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
