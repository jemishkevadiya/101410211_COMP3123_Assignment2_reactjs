import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './HomeScreen.css';

const HomeScreen = () => {
  const [employees, setEmployees] = useState([]);
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
        <h1 className="title">Employee Cards</h1>
        <div className="card-deck">
          {employees.map((employee) => (
            <div key={employee._id} className="card">
              <div className="card-content">
                <h3>{employee.first_name} {employee.last_name}</h3>
                <p><strong>Email:</strong> {employee.email}</p>
                <div className="card-actions">
                  <button className="action-button" onClick={() => handleView(employee._id)}>View</button>
                  <button className="action-button" onClick={() => handleEdit(employee._id)}>Edit</button>
                  <button className="action-button delete" onClick={() => handleDelete(employee._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="add-employee-container">
          <button onClick={handleAddEmployee} className="add-employee-button">Add Employee</button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
