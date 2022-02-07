import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Profiles</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/settings">
          <span>Settings</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <span>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      {/* <Link to="/">🦏RhinoNet</Link> */}

      <>{isAuthenticated ? authLinks : guestLinks}</>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
