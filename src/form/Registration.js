import React from "react";
import { useState } from "react";
import axios from "axios";
import "./Registration.css";
import logoImage from "../image/Logo (1).png";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate("");
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    accountNumber: "",
    branch: "",
    phoneNumber: "",
  });
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/signup", signupData);
      console.log("signup successful");
      navigate("/login");
    } catch (error) {
      console.error("signup failed", error);
    }
  };
  const handleClear = () => {
    setSignupData({
      username: "",
      password: "",
      accountNumber: "",
      branch: "",
      phoneNumber: "",
    });
  };
  return (
    <div className="signup-Container">
      <div className="image-signup-container"></div>
      <div className="signUp-text">
        <form onSubmit={handleSignup}>
          <div>
            <img src={logoImage} alt="bank logo" />
            <label>Username:</label>
            <input
              type="text"
              value={signupData.username}
              onChange={(e) =>
                setSignupData({ ...signupData, username: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              maxLength={8}
              required
            />
          </div>
          <div>
            <label>Account Number:</label>
            <input
              type="number"
              value={signupData.accountNumber}
              onChange={(e) => {
                if (e.target.value.length <= 14) {
                  setSignupData({
                    ...signupData,
                    accountNumber: e.target.value,
                  });
                }
              }}
              required
            />
          </div>
          <div>
            <label>Branch:</label>
            <input
              type="text"
              value={signupData.branch}
              onChange={(e) =>
                setSignupData({ ...signupData, branch: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Registered Phone Number:</label>
            <input
              type="number"
              value={signupData.phoneNumber}
              onChange={(e) => {
                if (e.target.value.length <= 10) {
                  setSignupData({ ...signupData, phoneNumber: e.target.value });
                }
              }}
              required
            />
          </div>
          <div>
            <button type="submit">Sign Up</button>
            <button type="submit" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
