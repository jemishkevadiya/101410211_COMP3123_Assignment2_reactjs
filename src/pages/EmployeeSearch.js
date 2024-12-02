import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomeScreen.css';

const EmployeeSearch = () => {
  const [query, setQuery] = useState('');
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://101410211-comp-3123-assignment2-nodejs.vercel.app/api/emp/employees/search?query=${query}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error searching employees:', error);
      alert('Failed to search employees');
    }
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="home-container">
      <h1 className="title">Employee Management</h1>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, position, or department..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      <div className="employee-cards">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div className="card" key={employee._id}>
              <h3>{employee.first_name} {employee.last_name}</h3>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Position:</strong> {employee.position}</p>
              <p><strong>Department:</strong> {employee.department}</p>
              <div className="card-actions">
                <button className="action-button view">View</button>
                <button className="action-button edit">Edit</button>
                <button className="action-button delete">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No employees found</p>
        )}
      </div>
      <div className="back-to-home-container">
        <button className="back-to-home-button" onClick={handleBackToHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default EmployeeSearch;
