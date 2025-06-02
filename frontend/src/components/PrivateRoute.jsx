import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const exp = localStorage.getItem('token_exp');

  const isTokenValid = token && Date.now() < Number(exp);

  return isTokenValid ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
