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
    <section>
      <h1>Settings</h1>
      <p>
        <i /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <SettingsActions />

          <div>
            <button onClick={() => deleteAccount()}>
              <i /> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
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
