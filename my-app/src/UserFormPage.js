import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import UserForm from './UserForm';
import { useNavigate } from 'react-router-dom';

import logo from './assets/classify-logo.png';

const UserFormPage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar bg="light" className="px-3">
        <Navbar.Brand href="#">
          {/* Logo */}
          <img
            src={logo}  // Replace with your actual logo file
            width="100"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        {/* Logout Button */}
        <Button variant="outline-danger" className="ms-auto">
          Logout
        </Button>
      </Navbar>

      {/* Text Label */}
      <Container className="mt-5">
        <h3 className="text-center mb-4">
          Fill out the form to get your personalized schedule 🌟
        </h3>
        {/* The Form */}
        <UserForm />
      </Container>
    </div>
  );
};

export default UserFormPage;
