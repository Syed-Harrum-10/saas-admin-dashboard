import React, { useState } from 'react';
import "../src/Pages/Login.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
    plan: 'free'
  });

  const navigate = useNavigate();

  






  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/oauth-register",
        formData,
        { withCredentials: true }
      );

      console.log('Login successful:', response.data);
      navigate('/dashboard'); 

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };
  const {
      isLoading, // Loading state, the SDK needs to reach Auth0 on load
      isAuthenticated,
      loginWithRedirect: login, // Starts the login flow

      user, 
    } = useAuth0();
    console.log(user)
    React.useEffect(() => {
  if (isAuthenticated) {
    navigate("/dashboard");
  }
}, [isAuthenticated]);
    
  
    const signup = () =>
      login({ authorizationParams: { screen_hint: "signup" } });
  
    
  
    if (isLoading) return "Loading...";
  

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Please enter your details to sign in</p>

        <form className="login-form" onSubmit={handleSubmit}>
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

          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
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
            Sign In
          </button>

          <div className="or-divider">
            <span>or</span>
          </div>

          <button className="google-button"  type="button" onClick={signup}>
            <img
              src="https://cdn.iconscout.com/icon/free/png-512/free-google-logo-icon-download-in-svg-png-gif-file-formats--social-media-brands-pack-logos-icons-189813.png?f=webp&w=256"
              alt="G"
            />
            Continue with Google
          </button>

          <div className="auth-redirect">
            Don't have an account?{' '}
            <a href="/register" className="signup-link">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
