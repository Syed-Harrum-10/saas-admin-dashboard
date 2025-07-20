import React, { useState } from "react";
import "../src/Pages/SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth0 } from "@auth0/auth0-react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    plan: "free",
  });

  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/auth/oauth-register",
        formData,
        { withCredentials: true }
      );
      console.log(res)

      toast.success("Signup successful!");
      navigate("/dashboard");

    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithRedirect({
        appState: { returnTo: "/callback" },
      });
    } catch (err) {
      console.error(err);
      toast.error("Google signup failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome!</h1>
        <p className="login-subtitle">Please enter your details to sign up</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Manual Signup Fields */}
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              className="login-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="login-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="login-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              className="role-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="plan">Plan</label>
            <select
              id="plan"
              name="plan"
              className="plan-select"
              value={formData.plan}
              onChange={handleChange}
            >
              <option value="free">Free</option>
              <option value="pro">Pro</option>
            </select>
          </div>

          <button type="submit" className="login-button">
            Sign Up
          </button>

          <div className="or-divider">
            <span>or</span>
          </div>

          {/* OAuth Signup */}
          <button
            className="google-button"
            onClick={handleGoogleSignup}
            type="button"
          >
            <img
              src="https://cdn.iconscout.com/icon/free/png-512/free-google-logo-icon-download-in-svg-png-gif-file-formats--social-media-brands-pack-logos-icons-189813.png?f=webp&w=256"
              alt="G"
            />
            Continue with Google
          </button>

          <div className="auth-redirect">
            Already have an account?{" "}
            <a href="/login" className="signup-link">
              Login
            </a>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
