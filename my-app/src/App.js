import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Add Navigate for redirection
import LoginPage from './LoginPage';
import UserFormPage from './UserFormPage';
import RecommendationPage from './RecommendationPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <Router>
        {/* Conditionally render LoginPage or application routes */}
        {isLoggedIn ? (
          <Routes>
            {/* Default route is UserFormPage after login */}
            <Route path="/" element={<UserFormPage />} />
            {/* Recommendation page */}
            <Route path="/recommendations" element={<RecommendationPage />} />
            {/* Redirect all other paths to UserFormPage */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          // Render LoginPage if not logged in
          <LoginPage onLogin={handleLogin} />
        )}
      </Router>
    </div>
  );
}

export default App;
