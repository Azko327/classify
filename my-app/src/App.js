// src/App.js
import React from 'react';
import './App.css';
import UserForm from './UserForm'; // Import the form

function App() {
  return (
    <div className="App">
      <h1>Course Registration Form</h1>
      <UserForm /> {/* Render the form */}
    </div>
  );
}

export default App;
