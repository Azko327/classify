import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button, Table, Form, Row, Col } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { FaPlus, FaMinus } from 'react-icons/fa';  // Import icons
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './RecommendationPage.css';  // Import the CSS file
import logo from './assets/classify-logo.png';

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
  

// Function to format the course schedule
    const formatSchedule = (days, time) => {
    const formattedDays = days.join('');  // e.g., "MW"
    const [startTime, endTime] = time.split(' - ');
    return `${formattedDays} ${moment(startTime, 'h:mm A').format('h:mm A')} - ${moment(endTime, 'h:mm A').format('h:mm A')}`;
  };

  // Add a course to the user's calendar
  const addCourse = (course) => {
    if (!userCourses.some((c) => c.number === course.number)) {
      setUserCourses([...userCourses, course]);
    }
  };

  // Remove a course from the user's calendar
  const removeCourse = (course) => {
    setUserCourses(userCourses.filter((c) => c.number !== course.number));
  };


  // Combine both recommended and user-added courses for the calendar
  const allCourses = [...recommendedCourses, ...userCourses];
  const events = userCourses.map((course) => {
    const [startTime, endTime] = course.time.split(' - ');
    return course.days.map((day) => ({
      title: `${course.number} - ${course.name}`,
      start: moment(`${day} ${startTime}`, 'dddd h:mm A').toDate(),
      end: moment(`${day} ${endTime}`, 'dddd h:mm A').toDate(),
    }));
  }).flat();
  

  return (
    <Container>
    <Navbar bg="white" className="navbar-white">
      <Navbar.Brand href="#">
        <img src={logo} alt="Logo" className="navbar-logo" /> {/* Logo */}
      </Navbar.Brand>
      <Button variant="outline-danger" className="ms-auto">Logout</Button>
    </Navbar>

      <Row className="mt-4">
      <Col md={7}>
        <h4>Your schedule</h4>
        <div className="calendar-container">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}  /* You can adjust the height as needed */
              defaultView="week"
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: 'purple',
                  color: 'white',
                },
              })}
            />
          </div>
      </Col>
        <Col md={5}>
          <h5>Recommended Courses</h5>
          <div className="course-table-container"> {/* Apply the new container class */}
            {recommendedCourses.map((course) => (
                <div className="course-container" key={course.number}>
                <div className="icon-container">
                    {userCourses.some((c) => c.number === course.number) ? (
                    <FaMinus onClick={() => removeCourse(course)} />
                    ) : (
                    <FaPlus onClick={() => addCourse(course)} />
                    )}
                </div>
                <div className="course-info">
                    <div className="course-number">{course.number}</div>
                    <div className="course-name">{course.name}</div>
                    <div className={`difficulty-tag ${course.difficulty.toLowerCase()}`}>{course.difficulty}</div>
                </div>
             </div>
             ))}
            </div>
        </Col>
      </Row>

      {/* Section for adding user course */}
      <Row className="mt-4">
        <h4>Add your own course</h4>
        <Form onSubmit={handleSearch}>
          <Form.Control
            type="text"
            placeholder="Search by course name or number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
            <Button className="search-button mt-3" type="submit">Search</Button>
        </Form>

        {courseResults.length > 0 && courseResults.map((course) => (
          <div className="course-container" key={course.number}>
            <div className="icon-container">
              {userCourses.some((c) => c.number === course.number) ? (
                <FaMinus onClick={() => removeCourse(course)} />
              ) : (
                <FaPlus onClick={() => addCourse(course)} />
              )}
            </div>
            <div className="course-info">
              <div className="course-number">{course.number}</div>
              <div className="course-name">{course.name}</div>
              <div className="course-schedule">{formatSchedule(course.days, course.time)}</div>
              <div className={`difficulty-tag ${course.difficulty.toLowerCase()}`}>{course.difficulty}</div>
            </div>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default RecommendationPage;
