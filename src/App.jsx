import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Education from './pages/Education';
import Valuation from './pages/Valuation';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('capy_user'));
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route 
          path="/education" 
          element={
            <ProtectedRoute>
              <Education />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/valuation" 
          element={
            <ProtectedRoute>
              <Valuation />
            </ProtectedRoute>
          } 
        />
        
        {/* Default route redirects to Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Fallback for unmatched routes */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
