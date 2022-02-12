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
    <div className="profile-top border-gold" style={{ paddingTop: "1rem" }}>
      <img
        className="my-profile"
        src={`data:image/*;base64,${picture}`}
        alt=""
      />
      <h1>{name}</h1>
      <p>{status}</p>
      <p>Birthday: {formatDate(birthday)}</p>
      <p>{location ? <span>Location: {location}</span> : null}</p>
      <p>{education ? <span>Education: {education}</span> : null}</p>
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
                  <i
                    style={{ margin: "1.5rem 0.5rem" }}
                    className={`fab fa-${key} fa-2x`}
                  ></i>
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
