import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://101410211-comp-3123-assignment2-nodejs.vercel.app/api/user/login', {
        email,
        password,
      });

      if (response.status === 200) {
        setEmail('');
        setPassword('');
        alert('Login successful!');
        localStorage.setItem('token', response.data.token); 
        navigate('/home'); 
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please try again.';
      alert(errorMessage);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="login-page">
      <video autoPlay loop muted className="background-video">
        <source src="/assets/bg-video.mp4" type="video/mp4" />
      </video>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
