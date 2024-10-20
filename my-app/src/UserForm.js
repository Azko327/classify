import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
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
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Major #1</Form.Label>
          <Form.Control
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            required
            placeholder="i.e. Computer Science"
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Major #2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Optional"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>List all your past and current classes</Form.Label>
        <Form.Control
          type="text"
          value={coursesTaken}
          onChange={(e) => setCoursesTaken(e.target.value)}
          required
          placeholder="i.e. CSE 202, MATH 023"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>OR drop in your most current transcript</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Career/Academic Interests</Form.Label>
        <Form.Control
          type="text"
          value={academicInterests}
          onChange={(e) => setAcademicInterests(e.target.value)}
          required
          placeholder="i.e. Machine Learning, Backend Development"
        />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Get Recommendations
      </Button>

    </Form>
  );
};

export default UserForm;
