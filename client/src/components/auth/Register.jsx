import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import myApi from "../../api/Api";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
var Buffer = require("buffer/").Buffer;

const Register = ({ register, isAuthenticated }) => {
  const [selectedFile, setSelectedFile] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    picture: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const onClickHandler = async () => {
    const data = new FormData();
    data.append("image", selectedFile);
    const picObj = await myApi.post("/upload", data);
    const picBuffer = await new Buffer(picObj.data.buffer.data).toString(
      "base64"
    );

    setFormData({ ...formData, picture: await picBuffer });
    picBuffer && alert("Image uploaded");
  };

  const fileUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      <div>
        <h3>*required*- Upload profile picture</h3>
        <input type="file" name="picture" onChange={(e) => fileUpload(e)} />
        <div>
          <button
            className="btn"
            style={{ background: "red" }}
            onClick={onClickHandler}
          >
            Upload to Server
          </button>
        </div>
      </div>
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
