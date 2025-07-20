import React from 'react';
import '../src/Pages/Layout.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';


const Layout = ({ children }) => {
  const navigate = useNavigate();
  const {logout} = useAuth0()

  const handleProfileClick = () => {
    navigate("/profile");
  };

const handleCombinedLogout = async () => {
  try {
    await axios.post("http://localhost:8000/auth/logout", {}, { withCredentials: true });
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  } catch (err) {
    toast.error("Server logout failed — proceeding with Auth0 logout");
    console.error(err);
  } finally {
    logout({ returnTo: "http://localhost:5173/logout" });
  }
};
;

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-title">MyApp</div>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/billing">Billing</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-area">
        <header className="topbar">
          <h2>Welcome Back</h2>

          <div className="topbar-actions">
            <div 
              className="account-icon" 
              onClick={handleProfileClick} 
              style={{ cursor: 'pointer', marginRight: '1rem' }}
            >
              <img
                src="https://static.thenounproject.com/png/user-icon-4584119-512.png"
                alt="Account"
                title="Go to Profile"
              />
            </div>

            <button className="logout-btn" onClick={handleCombinedLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
