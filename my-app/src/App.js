import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserFormPage from './UserFormPage';
import RecommendationPage from './RecommendationPage';
import LoginPage from './LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user-form" element={<UserFormPage />} />
        <Route path="/recommendations" element={<RecommendationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
