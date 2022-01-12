import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <h2>Page Not Found!</h2>
      <Link to="/">Return home</Link>
    </div>
  );
};

export default NotFound;
