// import { useState } from "react";
// import myApi from "./api/Api";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    store.dispatch(loadUser());
  }, []);
  // const [allUsers, setAllUsers] = useState("");
  // const [toggleAllUsers, setToggleAllUsers] = useState(false);
  // const [user, setUser] = useState("");
  // const [toggleUser, setToggleUser] = useState(false);
  // const [userId, setUserId] = useState("");
  // const [updateCredit, setUpdateCredit] = useState("");
  // const [toggleUserCredit, setToggleUserCredit] = useState(false);
  // const [userCredit, setUserCredit] = useState("");

  // const getReq = async () => {
  //   const { data } = await myApi.get("/users");
  //   const users = [];
  //   console.log(data);
  //   data.forEach((el, i) => {
  //     users.push(`name ${i + 1}: ${el.name}  . `);
  //   });
  //   setAllUsers(users);
  //   setToggleAllUsers(!toggleAllUsers);
  // };
  // const inputUserId = (el) => {
  //   setUserId(el.target.value);
  // };
  // const inputUpdateCredit = (el) => {
  //   setUpdateCredit(el.target.value);
  // };
  // const getReq1 = async () => {
  //   const { data } = await myApi.get(`/users/${userId}`);
  //   console.log(data);
  //   setUser(
  //     `name: ${data.name}, passportId: ${data.passportId}, _id:${data._id}, cash:${data.cash}, credit:${data.credit}`
  //   );
  //   setToggleUser(!toggleUser);
  // };
  // const getUpdateCredit = async () => {
  //   const { data } = await myApi.patch(`/users/credit/${userId}`, {
  //     credit: updateCredit,
  //   });
  //   console.log(data);
  //   setUserCredit(
  //     `name: ${data.name}, passportId: ${data.passportId}, _id:${data._id}, cash:${data.cash}, credit:${data.credit}`
  //   );
  //   setToggleUserCredit(!toggleUserCredit);
  // };
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="register" element={<Register />} />

          <Route path="login" element={<Login />} />
          {/* <button onClick={getReq}>get all users name</button>
      <p>{toggleAllUsers && allUsers}</p>
      <div>
      ID:
      <input onChange={inputUserId} value={userId}></input>
      </div>
      <button onClick={getReq1}>get user by ID</button>
      <p>{toggleUser && user}</p>
      <div>
      Update credit to:
      <input onChange={inputUpdateCredit} value={updateCredit}></input>
      </div>
      <button onClick={getUpdateCredit}>get Update credit</button>
    <p>{toggleUserCredit && userCredit}</p> */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
