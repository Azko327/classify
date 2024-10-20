import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

const UserForm = () => {
  const [major, setMajor] = useState('');
  const [academicInterests, setAcademicInterests] = useState('');
  const [coursesTaken, setCoursesTaken] = useState('');
  const [recommendations, setRecommendations] = useState(null); // For displaying recommended courses

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = {
      major,
      coursesTaken: coursesTaken.split(',').map(item => item.trim()), // Manually entered courses taken
      studentInterests: academicInterests, // Send academic interests to the backend for analysis
    };
  
    try {
      // Use your API Gateway URL here
      const response = await axios.post('https://ysluz2e9rj.execute-api.us-east-1.amazonaws.com/recommendation', userData);
      setRecommendations(response.data.recommendedCourses); // Update state with recommendations from backend
    } catch (error) {
      console.error('Error fetching course recommendations:', error);
    }
  
    // Reset the form
    setMajor('');
    setAcademicInterests('');
    setCoursesTaken('');
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

      {recommendations && (
        <div>
          <h2>Recommended Courses</h2>
          <ul>
            {recommendations.map((course, index) => (
              <li key={index}>
                {course.name} ({course.credits} credits) - {course.difficulty}
                <p>{course.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserForm;
