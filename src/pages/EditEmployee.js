import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditEmployee.css';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://101410211-comp-3123-assignment2-nodejs.vercel.app/api/emp/employees/${id}`, {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://101410211-comp-3123-assignment2-nodejs.vercel.app/api/emp/employees/${id}`, employee, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Employee updated successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee details.');
    }
  };

  return (
    <div className="edit-employee-page">
      <video autoPlay loop muted className="background-video">
        <source src="/assets/bg-video.mp4" type="video/mp4" />
      </video>
      <div className="form-container">
        <form className="edit-employee-form" onSubmit={handleSubmit}>
          <h2>Edit Employee</h2>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={employee.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={employee.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={employee.position}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Joining</label>
            <input
              type="date"
              name="date_of_joining"
              value={employee.date_of_joining}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={employee.department}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="save-button">Save Changes</button>
          <button type="button" className="cancel-button" onClick={() => navigate('/home')}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
