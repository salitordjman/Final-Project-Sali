import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SettingsActions from "./SettingsActions";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Settings = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <section className="landing">
      <h1>Settings</h1>
      <h3>Hello {user && user.name}</h3>
      {profile !== null ? (
        <>
          <SettingsActions />

          <div>
            <button className="btn" onClick={() => deleteAccount()}>
              <i /> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <h4>
            You have not yet creating a profile, please fill in some details
            about yourself
          </h4>
          <Link to="/create-profile">Create Profile</Link>
        </>
      )}
    </section>
  );
};

Settings.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Settings
);
