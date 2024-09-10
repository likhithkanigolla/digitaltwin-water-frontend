// Dashboard.js

import React from 'react';
import NavigationBar from '../components/Navigation/Navigation';

const Dashboard = () => {
  return (
    
    <div style={{ position: 'relative', paddingTop: '65px' }}> 
    <NavigationBar />
      <iframe
        title="Digital Twin Water"
        width="100%"
        height="780"
        src="http://10.2.16.116:3000/d/c653da7e-1484-4fa0-a9de-6042b35215da/digital-twin-water?orgId=1&from=now-6h&to=now&theme=light&kiosk"
        frameBorder="0"
        style={{ zIndex: 1 }}
      ></iframe>
    </div>
  );
};

export default Dashboard;
