import React, { useState } from 'react';
import { Container, Navbar, Button, Table, Form, Row, Col } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';  // Correct import
import moment from 'moment';  // Correct import
import 'react-big-calendar/lib/css/react-big-calendar.css';  // Add calendar styling

const RecommendationPage = () => {
  const [recommendedCourses, setRecommendedCourses] = useState([
    {
      number: 'CSE 260',
      name: 'Cybersecurity Fundamentals',
      difficulty: 'Medium',
      time: '9:00 AM - 10:30 AM',
      days: ['Monday', 'Wednesday'],
    },
    
    {
      number: 'CSE 303',
      name: 'Operating Systems',
      difficulty: 'Hard',
      time: '1:00 PM - 2:30 PM',
      days: ['Monday', 'Wednesday'],
    },
  ]);

  const localizer = momentLocalizer(moment);  // Use the correct momentLocalizer
  const events = recommendedCourses.map((course) => {
    const [startTime, endTime] = course.time.split(' - ');
    return course.days.map((day) => ({
      title: `${course.number} - ${course.name}`,
      start: moment(`${day} ${startTime}`, 'dddd h:mm A').toDate(),
      end: moment(`${day} ${endTime}`, 'dddd h:mm A').toDate(),
    }));
  }).flat();

  return (
    <Container>
      <Navbar bg="light">
        <Navbar.Brand href="#">Your Logo</Navbar.Brand>
        <Button variant="outline-danger" className="ms-auto">Logout</Button>
      </Navbar>

      <Row className="mt-4">
        <Col md={8}>
          <h4>Your schedule</h4>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </Col>
        <Col md={4}>
          <h5>Recommended Courses</h5>
          <Table bordered>
            <thead>
              <tr>
                <th>Course</th>
                <th>Name</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {recommendedCourses.map((course) => (
                <tr key={course.number}>
                  <td>{course.number}</td>
                  <td>{course.name}</td>
                  <td>{course.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="mt-5">
        <h6>Add your own course</h6>
        <Form>
          <Form.Control type="text" placeholder="Search by course name or number" />
          <Button variant="primary" className="mt-3">Search</Button>
        </Form>
      </Row>
    </Container>
  );
};

export default RecommendationPage;
