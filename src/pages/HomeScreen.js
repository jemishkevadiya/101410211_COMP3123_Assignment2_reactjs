import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeScreen.css';

const HomeScreen = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '', department: '' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:7777/api/emp/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleCreateEmployee = async () => {
    try {
      await axios.post('http://localhost:7777/api/emp/employees', newEmployee);
      fetchEmployees();
      setNewEmployee({ name: '', position: '', department: '' });
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  // Handle employee deletion
  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:7777/api/emp/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Handle search
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:7777/api/emp/employees/search?query=${searchTerm}`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };

  return (
    <div className="dashboard-page">
      <video autoPlay loop muted className="background-video">
        <source src="/assets/bg-video.mp4" type="video/mp4" />
      </video>
      <div className="dashboard-container">
        <h1>Employee Dashboard</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="create-container">
          <h3>Create Employee</h3>
          <input
            type="text"
            placeholder="Name"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Position"
            value={newEmployee.position}
            onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
          />
          <input
            type="text"
            placeholder="Department"
            value={newEmployee.department}
            onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
          />
          <button onClick={handleCreateEmployee}>Add Employee</button>
        </div>

        <div className="employee-list">
          <h3>Employees</h3>
          {employees.map((employee) => (
            <div key={employee._id} className="employee-card">
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Position:</strong> {employee.position}</p>
              <p><strong>Department:</strong> {employee.department}</p>
              <button onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
