import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

const UserForm = () => {
  const [major, setMajor] = useState('');
  const [academicInterests, setAcademicInterests] = useState('');
  const [coursesTaken, setCoursesTaken] = useState('');
  const [minCredits, setMinCredits] = useState(''); // Allow empty, default validation will apply
  const [maxCredits, setMaxCredits] = useState(''); // Allow empty, default validation will apply
  const [recommendations, setRecommendations] = useState(null); // For displaying recommended courses
  const [errorMessage, setErrorMessage] = useState(''); // To show any errors

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset the error message before sending request
    setErrorMessage('');

    const userData = {
      major,
      coursesTaken: coursesTaken.split(',').map(item => item.trim()), // Manually entered courses taken
      studentInterests: academicInterests, // Send academic interests to the backend for analysis
      minCredits: minCredits || 12, // Default to 12 if empty
      maxCredits: maxCredits || 18, // Default to 18 if empty
    };

    try {
      const response = await axios.post('https://ysluz2e9rj.execute-api.us-east-1.amazonaws.com/recommendation', userData);
      setRecommendations(response.data.recommendedCourses); // Update state with recommendations from backend
    } catch (error) {
      if (error.response && error.response.data) {
        // Display the error message from the backend
        setErrorMessage(error.response.data.error || 'An error occurred.');
      } else {
        setErrorMessage('An error occurred while fetching recommendations.');
      }
      console.error('Error fetching course recommendations:', error);
    }

    // Reset the form
    setMajor('');
    setAcademicInterests('');
    setCoursesTaken('');
    setMinCredits(''); // Reset to empty, defaults applied by backend
    setMaxCredits(''); // Reset to empty, defaults applied by backend
  };

  return (
    <div>
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
          <label>Career/Academic Interests:</label>
          <input
            type="text"
            value={academicInterests}
            onChange={(e) => setAcademicInterests(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Minimum Credits (optional):</label>
          <input
            type="number"
            value={minCredits}
            onChange={(e) => setMinCredits(e.target.value)}
          />
        </div>

        <div>
          <label>Maximum Credits (optional):</label>
          <input
            type="number"
            value={maxCredits}
            onChange={(e) => setMaxCredits(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {recommendations && (
        <div>
          <h2>Recommended Courses</h2>
          <ul>
            {recommendations.map((course, index) => (
              <li key={index}>
                {/* Display course number first, then name, credits, days, and time */}
                {course.number} - {course.name} ({course.credits} credits) - {course.difficulty}
                <p>{course.description}</p>
                <p><strong>Days:</strong> {course.days.join(', ')}</p>
                <p><strong>Time:</strong> {course.time}</p>
              </li>
            ))}
          </ul>
          <h3>Total Credits: {recommendations.reduce((sum, course) => sum + course.credits, 0)}</h3>
        </div>
      )}
    </div>
  );
};

export default UserForm;