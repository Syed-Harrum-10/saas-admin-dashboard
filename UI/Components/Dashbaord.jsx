import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../src/Pages/Screen.css';

const DashboardNav = () => {
  const [revenue, setRevenue] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const revenueRes = await axios.get('http://localhost:8000/analyst/revenue', {
          withCredentials: true,
        });
        setRevenue(revenueRes.data.totalAmount);

        const usersRes = await axios.get('http://localhost:8000/analyst/subscriptions', {
          withCredentials: true,
        });
        setActiveUsers(usersRes.data.activeSubscriptions);
        setTotalUsers(usersRes.data.totalSubscriptions);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-nav">
        <h1>Dashboard Overview</h1>

        {/* Stat Cards */}
        <div className="stat-box-grid">
          <div className="stat-box">
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>
          <div className="stat-box">
            <h3>Active Users</h3>
            <p>{activeUsers}</p>
          </div>
          <div className="stat-box">
            <h3>Revenue</h3>
            <p>${revenue}</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity-box">
          <h2>Recent Activity</h2>
          <table className="activity-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ali Raza</td>
                <td>2025-07-16</td>
                <td>Logged in</td>
              </tr>
              <tr>
                <td>Harrum</td>
                <td>2025-07-15</td>
                <td>Updated profile</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
