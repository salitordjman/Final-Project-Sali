import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import formatDate from "../../utils/formatDate";

const ProfileItem = ({
  profile: {
    user: { _id, name },
    // user: { _id, name, picture },
    status,
    birthday,
    location,
    hobbies,
  },
}) => {
  return (
    <div className="profile border-gold">
      {/* <img src={picture} alt="" /> */}
      <div>
        <h2>{name}</h2>
        <p>{status}</p>
        <p>Birthday: {formatDate(birthday)}</p>
        <p>{location && <span>Location: {location}</span>}</p>
        <Link to={`/profile/${_id}`}>View Profile</Link>
      </div>
      <ul>
        Hobbies:
        {hobbies.slice(0, 4).map((hobb, index) => (
          <li key={index}>{hobb}</li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
