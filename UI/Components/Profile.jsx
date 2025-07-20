import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../src/Pages/Profile.css';

const UserProfile = () => {
  const [user, setUser] = useState({ name: '', email: '', avatar: '' });
  const [imagePreview, setImagePreview] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8000/user/profile', { 
          withCredentials: true 
        });
        const { name, email, avatar } = res.data;
        setUser({ name, email, avatar });
        setImagePreview(avatar);
      } catch (err) {
        console.error('Profile fetch failed', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    if (file) formData.append('image', file);

    try {
      const res = await axios.put('http://localhost:8000/user/profile', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { name, email, avatar } = res.data.user;
      setUser({ name, email, avatar });
      setImagePreview(avatar);
      setFile(null);
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="image-upload">
          <label>Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imagePreview && (
            <img src={imagePreview} alt="Profile preview" className="profile-preview" />
          )}
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            type="text"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="save-button" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;