import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate to handle navigation
import { Form, Button, Row, Col } from 'react-bootstrap';  // Add Row and Col here

const UserForm = () => {
  const [major, setMajor] = useState('');
  const [academicInterests, setAcademicInterests] = useState('');
  const [coursesTaken, setCoursesTaken] = useState('');
  const navigate = useNavigate();  // Hook to navigate to different routes

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission
    console.log({ major, academicInterests, coursesTaken });

    // Navigate to the recommendation page after form submission
    navigate('/recommendations');  // Redirect to the recommendations page
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formMajor1">
            <Form.Label>Major #1</Form.Label>
            <Form.Control
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="e.g., Computer Science"
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formMajor2">
            <Form.Label>Major #2</Form.Label>
            <Form.Control type="text" placeholder="Optional" />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="formCourses" className="mb-3">
        <Form.Label>List all your past and current classes</Form.Label>
        <Form.Control
          type="text"
          value={coursesTaken}
          onChange={(e) => setCoursesTaken(e.target.value)}
          placeholder="i.e. CSE 202, MATH 023"
          required
        />
      </Form.Group>

      <Form.Group controlId="formAcademicInterests" className="mb-3">
        <Form.Label>Career/Academic Interests</Form.Label>
        <Form.Control
          type="text"
          value={academicInterests}
          onChange={(e) => setAcademicInterests(e.target.value)}
          placeholder="i.e. Machine Learning, Backend Development"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mb-3">
        Get Recommendations
      </Button>
    </Form>
  );
};

export default UserForm;
