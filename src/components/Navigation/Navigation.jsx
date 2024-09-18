import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './NavigationBar.css';
import IITHLOGO from './images/iiith.png';
import SCRCLOGO from './images/scrc_logo.png';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To get the current URL
  const [selectedPage, setSelectedPage] = useState(location.pathname); // Set the initial state to the current path
  useEffect(() => {
    setSelectedPage(location.pathname); // Update the selected value if the route changes
  }, [location.pathname]);

  const handleNavigation = (event) => {
    const value = event.target.value;
    setSelectedPage(value);
    if (value) {
      navigate(value);
    }
  };

  const handleBackToDtClick = () => {
    window.location.href = "https://smartcitylivinglab.iiit.ac.in/dt_waternetwork/";
    
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 1000 }}>
      <nav className="navbar">
        <Link to="/">
          <div className="navbar__logo">
            <img src={IITHLOGO} alt="IIITH Logo" />
            <img src={SCRCLOGO} alt="Smart City Living Lab Logo" />
          </div>
        </Link>
        <div className="navbar__dashboard">Digital Twin</div>
        <button className='btn_back' onClick={handleBackToDtClick}>
          Back to DT
        </button>
        <select
          className="navbar__dropdown"
          value={selectedPage}
          onChange={handleNavigation}
        >
          <option value="/">Dashboard</option>
          <option value="/actuation">Actuation</option>
          <option value="/simulation">Simulation</option>
          <option value="/3d">3D</option>
        </select>
      </nav>
    </div>
  );
};

export default NavigationBar;
