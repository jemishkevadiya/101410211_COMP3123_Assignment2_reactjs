import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './HomeScreen.css';

const HomeScreen = () => {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState(''); 
  const navigate = useNavigate();

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:7777/api/emp/employees', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      if (error.response?.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/');
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:7777/api/emp/employees/search?query=${query}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error searching employees:', error);
      alert('Failed to fetch search results.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7777/api/emp/employees/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleView = (id) => {
    navigate(`/view-employee/${id}`);
  };

  const handleAddEmployee = () => {
    navigate('/add-employee');
  };

  return (
    <div className="home-screen">
      <video autoPlay loop muted className="background-video">
        <source src="/assets/bg-video.mp4" type="video/mp4" />
      </video>
      <div className="overlay">
        <h1 className="title">Employee Management</h1>

        {/* Search Bar */}
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

        {/* Employee Cards */}
        <div className="card-deck">
          {employees.map((employee) => (
            <div key={employee._id} className="card">
              <div className="card-content">
                <h3>{employee.first_name} {employee.last_name}</h3>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Position:</strong> {employee.position}</p>
                <p><strong>Department:</strong> {employee.department}</p>
                <div className="card-actions">
                  <button className="action-button view" onClick={() => handleView(employee._id)}>View</button>
                  <button className="action-button edit" onClick={() => handleEdit(employee._id)}>Edit</button>
                  <button className="action-button delete" onClick={() => handleDelete(employee._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Employee Button */}
        <div className="add-employee-container">
          <button onClick={handleAddEmployee} className="add-employee-button">Add Employee</button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
