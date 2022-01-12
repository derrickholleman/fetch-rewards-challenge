import React from "react";
import "./Form.css";

const Form = () => {
  return (
    <div className="form-wrapper">
      <form>
        <div className="form-field">
          <label htmlFor="full-name">
            Full Name:<span className="red-accent">*</span>
          </label>
          <input type="text" id="full-name" required />
        </div>

        <div className="form-field">
          <label htmlFor="email">
            Email:<span className="red-accent">*</span>
          </label>
          <input type="text" id="email" required />
        </div>

        <div className="form-field">
          <label htmlFor="password">
            Password:<span className="red-accent">*</span>
          </label>
          <input type="password" id="password" required />
        </div>

        <div className="form-field">
          <label htmlFor="occupation">
            Occupation:<span className="red-accent">*</span>
          </label>
          <input type="text" id="occupation" required />
        </div>

        <div className="form-field">
          <label htmlFor="state">
            State:<span className="red-accent">*</span>
          </label>
          <input type="text" id="state" required />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
