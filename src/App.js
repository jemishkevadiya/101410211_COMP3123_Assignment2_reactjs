import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; 
import SignUp from './pages/SignUp';
import HomeScreen from './pages/HomeScreen';
import AddEmployee from './pages/AddEmployee';
import ViewEmployee from './pages/ViewEmployee';
import EditEmployee from './pages/EditEmployee';
import EmployeeSearch from './pages/EmployeeSearch';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomeScreen />} /> 
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/view-employee/:id" element={<ViewEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          <Route path="/search-employees" element={<EmployeeSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
