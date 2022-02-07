import React from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/settings" />;
  }

  return (
    <section>
      <div>
        <div>
          <h1>RhinoNet</h1>
          <h3>
            Collaborative social network, let's start sharing your creativity
          </h3>
          <h2>
            <Link to="/register">Sign Up</Link>
            {"\xa0\xa0\xa0\xa0\xa0"}
            <Link to="/login">Login</Link>
          </h2>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
