import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { _id, name, picture },
    status,
    birthday,
    location,
    hobbies,
  },
}) => {
  return (
    <div>
      <img src={picture} alt="" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {birthday && <span> at {birthday}</span>}
        </p>
        <p>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`}>View Profile</Link>
      </div>
      <ul>
        {hobbies.slice(0, 4).map((hobb, index) => (
          <li key={index}>
            <i /> {hobb}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
