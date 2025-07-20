import React, { useEffect, useState } from 'react';
import '../src/Pages/User Management.css';
import axios from "axios";

function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers(); // ✅ You forgot to call this on mount
  }, []);

  async function getUsers() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/user/users", {
        withCredentials: true
      });
      setUsers(response.data?.users || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading-message">Loading users...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="user-management-wrapper">
      <div className="user-management-container">
        <div className="user-management-header">
          <h2>User Management</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            disabled={users.length === 0} 
          />
        </div>

        <h3 className="account-title">Account</h3>
        <div className="user-table-wrapper">
          {filteredUsers.length > 0 ? (
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id || user.id}>
                    <td>{user.name || 'N/A'}</td>
                    <td>{user.email || 'N/A'}</td>
                    <td>{user.role || 'user'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-users-message">No users found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
