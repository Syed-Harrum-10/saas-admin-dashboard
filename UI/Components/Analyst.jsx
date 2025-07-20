import React, { useEffect, useState } from 'react';
import '../src/Pages/Analyst.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

const Analytics = () => {
  const [revenue, setRevenue] = useState(0);
  const [subscriptions, setSubscriptions] = useState({
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    nonActiveSubscriptions: 0
  });
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const baseURL = 'http://localhost:8000/analyst';

        const [revenueRes, subsRes, dailyRes] = await Promise.all([
          axios.get(`${baseURL}/revenue`, { withCredentials: true }),
          axios.get(`${baseURL}/subscriptions`, { withCredentials: true }),
          axios.get(`${baseURL}/users`, { withCredentials: true }),
        ]);

        setRevenue(revenueRes.data.totalAmount);
        setSubscriptions({
          totalSubscriptions: subsRes.data.totalSubscriptions,
          activeSubscriptions: subsRes.data.activeSubscriptions,
          nonActiveSubscriptions: subsRes.data.nonActiveSubscriptions
        });

        // Format for recharts
        const chartData = dailyRes.data.revenue.map(item => ({
          name: `${item._id.day}/${item._id.month}`,
          value: item.total
        }));
        setDailyRevenue(chartData);
      } catch (error) {
        console.error("Failed to load analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div>Loading analytics...</div>;

  return (
    <div className="analytics-wrapper">
      <div className="analytics-card">
        <h1>Analytics</h1>

        {/* Metrics Section */}
        <div className="metrics-section">
          <div className="metric-item">
            <strong>Total Subscriptions</strong>
            <div className="metric-value">{subscriptions.totalSubscriptions}</div>
          </div>

          <div className="metric-item">
            <strong>Total Revenue</strong>
            <div className="metric-value">${revenue}</div>
          </div>

          <div className="metric-item">
            <strong>Active / Inactive</strong>
            <div className="metric-value">
              {subscriptions.activeSubscriptions} / {subscriptions.nonActiveSubscriptions}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-item">
            <strong>Revenue Over Time</strong>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Placeholder second chart */}
          <div className="chart-item">
            <strong>User Retention</strong>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
