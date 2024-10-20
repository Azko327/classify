import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SharedStyles.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Navigate to the user form page after login
    navigate('/user-form');
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1>Login</h1>
      <Button className="orange-button" variant="primary" onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
};

export default LoginPage;
