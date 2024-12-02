import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewEmployee.css';

const ViewEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:7777/api/emp/employees/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
        alert('Failed to fetch employee details.');
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="view-employee-page">
      <video autoPlay loop muted className="background-video">
        <source src="/assets/bg-video.mp4" type="video/mp4" />
      </video>
      <div className="card-ViewEmp-container">
        <div className="card-ViewEmp">
          <div className="card-ViewEmp-content">
            <h3>{employee.first_name} {employee.last_name}</h3>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Position:</strong> {employee.position}</p>
            <p><strong>Salary:</strong> ${employee.salary}</p>
            <p><strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toDateString()}</p>
            <p><strong>Department:</strong> {employee.department}</p>
          </div>
        </div>
        <button className="back-button" onClick={() => navigate('/home')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ViewEmployee;
