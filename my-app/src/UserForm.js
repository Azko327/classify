import React, { useState } from 'react';
import { db } from './firebaseConfig'; // Import Firestore config
import { doc, setDoc } from 'firebase/firestore'; // Firestore functions

const UserForm = () => {
  const [major, setMajor] = useState('');
  const [academicInterests, setAcademicInterests] = useState('');
  const [coursesTaken, setCoursesTaken] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      major,
      academicInterests: academicInterests.split(',').map(item => item.trim()),
      pastClasses: coursesTaken.split(',').map(item => item.trim()), // Manually entered courses taken
    };

    // Store the data in Firebase
    try {
      const userId = 'userID123'; // Replace with actual user ID or dynamic value
      await setDoc(doc(db, 'users', userId), userData);
      console.log('Data successfully saved to Firebase');
    } catch (error) {
      console.error('Error saving data to Firebase:', error);
    }

    // Reset the form
    setMajor('');
    setAcademicInterests('');
    setCoursesTaken('');
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
        <label>Courses Taken (comma separated):</label>
        <input
          type="text"
          value={coursesTaken}
          onChange={(e) => setCoursesTaken(e.target.value)}
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
