import React from "react";
import PropTypes from "prop-types";
import formatDate from "../../utils/formatDate";

const ProfileTop = ({
  profile: {
    birthday,
    status,
    location,
    social,
    education,
    user: { name, picture },
  },
}) => {
  return (
    <div>
      <img src={picture} alt="" />
      <h1>{name}</h1>
      <p>{status}</p>
      <p>{formatDate(birthday)}</p>
      <p>{location ? <span>{location}</span> : null}</p>
      <p>{education ? <span>{education}</span> : null}</p>
      <div>
        {social
          ? Object.entries(social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i></i>
                </a>
              ))
          : null}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
