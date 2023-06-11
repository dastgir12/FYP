import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { IsLoggedIn } from '../auth';

const Privateroute = () => {
  const navigate = useNavigate();

  if (IsLoggedIn()) {
    return <Outlet />;
  } else {
    navigate('/login');
    return null; 
  }
};

export default Privateroute;
