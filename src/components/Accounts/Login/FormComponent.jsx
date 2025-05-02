import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // <-- import your icons
import "./style.css";

const FormComponent = ({ title, inputs, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const isLoginPage = location.pathname === "/login";
  const oppositePath = isLoginPage ? "/signup" : "/login";
  const oppositeText = isLoginPage ? "Sign up here" : "Login here";

  return (
    <div className="accounts-wrapper display-flex">
      <div className="checkout-section-one accounts-wrapped">
        <form onSubmit={handleSubmit} className="input-group">
          <h2>{title}</h2>

          {inputs.map((input, index) => {
            // If this input is for password
            if (input.type === "password") {
              return (
                <div key={index} className="password-field">
                  <input className="passwordfield"
                    type={showPassword ? "text" : "password"}
                    name={input.name}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    required={input.required || false}
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <FaEyeSlash className="eye-icon" /> : <FaEye />}
                  </span>
                </div>
              );
            }

            // For all other inputs
            return (
              <input
                key={index}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                onChange={handleChange}
                required={input.required || false}
              />
            );
          })}

          <button type="submit" className="order-button">
            Submit
          </button>
        </form>

        <p>OR</p>
        <Link to={oppositePath} className="form-component-link">
          {oppositeText}
        </Link>
      </div>
    </div>
  );
};

export default FormComponent;
