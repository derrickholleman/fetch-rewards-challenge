import React, { useState, useEffect } from "react";
import "./Form.css";
import { useHistory } from "react-router-dom";
import { validateOccupationsAndStates } from "../../utils/validateJson";
import { getOccupationsAndStates, submitUserData } from "../../utils/api";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  occupation: "",
  state: "",
};

const Form = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialFormState });
  const [occupationsAndStates, setOccupationsAndStates] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = (e) => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await submitUserData(formData);
      if (res.ok) {
        setFormData({ ...initialFormState });
        history.push("/success");
      } else {
        throw new Error(res.status);
      }
    } catch (err) {
      console.error(err);
      setError(err);
    }
  }

  // load data from API onto the page
  useEffect(() => {
    setLoaded(false);
    setError(false);
    
    getOccupationsAndStates()
      .then((res) => {
        if (validateOccupationsAndStates(res) === true) {
          setOccupationsAndStates(res);
          setLoaded(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  return (
    <div className="form-wrapper">
      {/* display error message if API fetch fails */}
      {error && (
        <p className="error">
          Something went wrong! Please refresh the page and try again.
        </p>
      )}

      {loaded && (
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">
              Full Name:<span className="red-accent">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">
              Email:<span className="red-accent">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">
              Password:<span className="red-accent">*</span>
            </label>
            {/* show/hide password field toggle */}
            <div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <p onClick={handleShowPassword} className="show-hide-password">
                {showPassword ? "Hide Password" : "Show Password"}
              </p>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="occupation">
              Occupation:<span className="red-accent">*</span>
            </label>
            <select
              required
              onChange={handleChange}
              id="occupation"
              name="occupation"
            >
              <option value="">-- Choose an Occupation -- </option>
              {/* mapping out fetched data from api */}
              {occupationsAndStates.occupations.map((occupation, index) => (
                <option key={index} value={occupation}>
                  {occupation}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="state">
              State:<span className="red-accent">*</span>
            </label>
            <select required onChange={handleChange} id="state" name="state">
              {/* mapping out fetched data from api */}
              <option value="">-- Choose a State -- </option>
              {occupationsAndStates.states.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name} ({state.abbreviation})
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Submit</button>
        </form>
      )}

      <p>
        <span className="red-accent">*</span>Required Fields
      </p>
    </div>
  );
};

export default Form;
