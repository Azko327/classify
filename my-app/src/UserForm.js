// src/UserForm.js
import React, { useState } from 'react';

const UserForm = () => {
  // State variables to store the input values
  const [major, setMajor] = useState('');
  const [minor, setMinor] = useState('');
  const [pastClasses, setPastClasses] = useState('');
  const [academicInterests, setAcademicInterests] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Gather data into a JSON object
    const userData = {
      major: major,
      minor: minor,
      pastClasses: pastClasses.split(','),
      academicInterests: academicInterests.split(',')
    };
  
    try {
      // Make a POST request to the AWS API Gateway endpoint
      const response = await fetch('api=key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        console.log('Data successfully processed');
      } else {
        console.error('Error processing data:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  
    // Reset the form after submission
    setMajor('');
    setMinor('');
    setPastClasses('');
    setAcademicInterests('');
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Major:</label>
        <input
          type="text"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Minor:</label>
        <input
          type="text"
          value={minor}
          onChange={(e) => setMinor(e.target.value)}
        />
      </div>

      <div>
        <label>List of Past Classes (comma separated):</label>
        <input
          type="text"
          value={pastClasses}
          onChange={(e) => setPastClasses(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Career/Academic Interests (comma separated):</label>
        <input
          type="text"
          value={academicInterests}
          onChange={(e) => setAcademicInterests(e.target.value)}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
