import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddEmployee.css';

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://101410211-comp-3123-assignment2-nodejs.vercel.app/api/emp/employees', employeeData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.status === 201) {
        alert('Employee added successfully!');
        navigate('/home');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert(error.response?.data?.message || 'Failed to add employee.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-employee-page">
      <video autoPlay loop muted className="background-video">
        <source src="/assets/bg-video.mp4" type="video/mp4" />
      </video>
      <div className="overlay">
        <h1>Add Employee</h1>
        <form className="add-employee-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={employeeData.first_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={employeeData.last_name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={employeeData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={employeeData.position}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={employeeData.salary}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date_of_joining"
            placeholder="Date of Joining"
            value={employeeData.date_of_joining}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={employeeData.department}
            onChange={handleChange}
            required
          />
          <div className="buttons-container">
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Employee'}
            </button>
            <button
              type="button"
              className="back-button"
              onClick={() => navigate('/home')}
            >
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
