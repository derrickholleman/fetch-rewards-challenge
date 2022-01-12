import React, { useState, useEffect } from "react";
import "./Form.css";
import { useHistory } from "react-router-dom";

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    async function submitUserData() {
      try {
        await fetch("https://frontend-take-home.fetchrewards.com/form", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } catch (err) {
        console.error(err);
      }
    }
    submitUserData();
    setFormData({ ...initialFormState });

    // go to success page on form submit
    history.push("/success");
  };

  useEffect(() => {
    setLoaded(false);
    async function getOccupationsAndStates() {
      const response = await fetch(
        "https://frontend-take-home.fetchrewards.com/form"
      );
      const resJSON = await response.json();
      setOccupationsAndStates(resJSON);
      setLoaded(true);
    }
    getOccupationsAndStates();
  }, []);

  return (
    <div className="form-wrapper">
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
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
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
