import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import UserForm from './UserForm';

const UserFormPage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar bg="light" className="px-3">
        <Navbar.Brand href="#">
          {/* Logo */}
          <img
            src="logo.png" // Replace with your logo path
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

      {/* Container for text and form */}
      <Container className="mt-5">
        {/* Text Label */}
        <h2 className="text-center mb-4">
          Fill out the form to get your personalized schedule 🌟
        </h2>

        {/* The Form */}
        <UserForm />
      </Container>
    </div>
  );
};

export default UserFormPage;
