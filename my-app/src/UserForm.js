import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap'; // Use Bootstrap for layout and styling
import { useNavigate } from 'react-router-dom'; // React Router for navigation

const UserForm = () => {
  const [major, setMajor] = useState('');
  const [academicInterests, setAcademicInterests] = useState('');
  const [coursesTaken, setCoursesTaken] = useState('');
  const [minCredits, setMinCredits] = useState(''); // Optional, defaults applied if empty
  const [maxCredits, setMaxCredits] = useState(''); // Optional, defaults applied if empty
  const [errorMessage, setErrorMessage] = useState(''); // To show any errors

  const navigate = useNavigate(); // Hook to navigate to different routes

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

      // Navigate to the recommendations page and pass the response data
      navigate('/recommendations', { state: { recommendedCourses: response.data.recommendedCourses } });
    } catch (error) {
      if (error.response && error.response.data) {
        // Display the error message from the backend
        setErrorMessage(error.response.data.error || 'An error occurred.');
      } else {
        setErrorMessage('An error occurred while fetching recommendations.');
      }
      console.error('Error fetching course recommendations:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit} className="p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form.Group className="mb-3" controlId="formMajor">
          <Form.Label>Major</Form.Label>
          <Form.Control
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="e.g., Computer Science"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCoursesTaken">
          <Form.Label>Courses Taken (comma separated)</Form.Label>
          <Form.Control
            type="text"
            value={coursesTaken}
            onChange={(e) => setCoursesTaken(e.target.value)}
            placeholder="e.g., CSE 202, MATH 023"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAcademicInterests">
          <Form.Label>Career/Academic Interests</Form.Label>
          <Form.Control
            type="text"
            value={academicInterests}
            onChange={(e) => setAcademicInterests(e.target.value)}
            placeholder="e.g., Machine Learning, Backend Development"
            required
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="formMinCredits">
              <Form.Label>Minimum Credits (optional)</Form.Label>
              <Form.Control
                type="number"
                value={minCredits}
                onChange={(e) => setMinCredits(e.target.value)}
                placeholder="12"
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formMaxCredits">
              <Form.Label>Maximum Credits (optional)</Form.Label>
              <Form.Control
                type="number"
                value={maxCredits}
                onChange={(e) => setMaxCredits(e.target.value)}
                placeholder="18"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-4 w-100">
          Get Recommendations
        </Button>
      </Form>
    </Container>
  );
};

export default UserForm;
