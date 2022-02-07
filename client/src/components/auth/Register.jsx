import { connect } from "react-redux";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
// import myApi from "../../api/Api";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    picture: "",
    password: "",
    password2: "",
  });

  const { name, email, picture, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Incompatible passwords");
    } else {
      register(formData);
      // try {
      //   const res = await myApi.post("/user", formData);
      //   console.log(res.data);
      //   alert("User registered successfully");
      // } catch (e) {
      //   alert(e);
      // }
    }
  };
  if (isAuthenticated) {
    return <Navigate to="/settings" />;
  }
  return (
    <section className="container">
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            minLength={2}
            required
          />
        </div>
        <div>
          Pick your pic
          <input
            type="file"
            id="img"
            placeholder="Picture"
            name="picture"
            value={picture}
            onChange={onChange}
            accept="image/*"
            className="input-img"
          />
        </div>
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
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            autoComplete="on"
            minLength={6}
            required
          />
        </div>
        <input className="btn" type="submit" value="Register" />
      </form>
      <h3>
        <Link to="/login">Sign In</Link> instead?
      </h3>
    </section>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
