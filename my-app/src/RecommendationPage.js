import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button, Table, Form, Row, Col } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const RecommendationPage = () => {
  const location = useLocation();
  const { recommendedCourses } = location.state || { recommendedCourses: [] };  // Recommended courses from form submission

  const [userCourses, setUserCourses] = useState([]);  // User-added courses
  const [searchTerm, setSearchTerm] = useState('');  // Search input
  const [courseResults, setCourseResults] = useState([]);  // Search results
  const [allCoursesJson, setAllCoursesJson] = useState([]);  // Loaded courses from the JSON file

  const localizer = momentLocalizer(moment);  // Initialize momentLocalizer for the calendar

  useEffect(() => {
    fetch('/courses.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAllCoursesJson(data);  // Save courses to state
        console.log('Courses loaded:', data);  // Log the loaded courses to verify
      })
      .catch(err => console.error('Error loading courses:', err));
  }, []);

  // Handle course search by name or number (case insensitive)
  const handleSearch = (e) => {
    e.preventDefault();
    if (!allCoursesJson.length) {
      console.error('Courses are not loaded yet.');
      return;
    }
  
    // Log the allCoursesJson to ensure it's populated
    console.log('All courses:', allCoursesJson);
  
    const filteredCourses = allCoursesJson.filter(course =>
      course.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    console.log('Filtered courses:', filteredCourses);
    setCourseResults(filteredCourses);
  };
  

  // Add a course to the user's calendar
  const addCourse = (course) => {
    if (!userCourses.some((c) => c.number === course.number)) {
      setUserCourses([...userCourses, course]);  // Add course to user's list if not already added
    }
  };

  // Combine both recommended and user-added courses for the calendar
  const allCourses = [...recommendedCourses, ...userCourses];

  // Convert all courses into events for the calendar
  const events = allCourses.map((course) => {
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
            defaultView="week"  // Set default view to week
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

      {/* Section for adding user course */}
      <Row className="mt-4">
        <h6>Add your own course</h6>
        <Form onSubmit={handleSearch}>
        <Form.Control
            type="text"
            placeholder="Search by course name or number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

          <Button variant="primary" className="mt-3" type="submit">Search</Button>
        </Form>

        {/* Display search results */}
        {courseResults.length > 0 && (
          <Table className="mt-4" bordered>
            <thead>
              <tr>
                <th>Course Number</th>
                <th>Course Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courseResults.map((course) => (
                <tr key={course.number}>
                  <td>{course.number}</td>
                  <td>{course.name}</td>
                  <td>
                    <Button variant="success" onClick={() => addCourse(course)}>Add to Schedule</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Row>
    </Container>
  );
};

export default RecommendationPage;
