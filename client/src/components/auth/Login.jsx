import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
// import myApi from "../../api/Api";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(formData);
    //   try {
    //     const res = await myApi.post("/auth", formData);
    //     console.log(res.data);
    //     alert("User Login successfully");
    //   } catch (e) {
    //     alert(e);
    //   }
  };
  if (isAuthenticated) {
    return <Navigate to="/settings" />;
  }
  return (
    <section>
      <h1>Sign In</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            autoComplete="on"
            name="password"
            value={password}
            onChange={onChange}
            minLength={6}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
      <h3>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </h3>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
