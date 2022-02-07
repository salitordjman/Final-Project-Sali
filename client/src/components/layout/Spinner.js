import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => (
  <>
    <h1>Loading...</h1>
    <img
      src={spinner}
      style={{
        width: "300px",
        margin: "auto",
        display: "block",
      }}
      alt="Loading..."
    />
  </>
);

export default Spinner;
