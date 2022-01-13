import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="centering-wrapper">
      <h2>Form successfully submitted!</h2>
      <Link to="/">Submit another form?</Link>
    </div>
  );
};

export default Success;
