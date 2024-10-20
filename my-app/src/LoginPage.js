import React from 'react';
import { Container, Button } from 'react-bootstrap';

const LoginPage = ({ onLogin }) => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1>Login</h1>
      <Button variant="primary" onClick={onLogin}>
        Login
      </Button>
    </Container>
  );
};

export default LoginPage;
