import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './system.css'

const VITE_NODE_SERVER_URL = import.meta.env.VITE_NODE_SERVER_URL;

const SystemStats = ({ data }) => {
 
  const renderRamStats = () => {
    return Object.entries(data.RAM).map(([key, value]) => (
      <div key={key} className="stat-card">
        <h3>{key.replace(/_/g, ' ')} Memory</h3> 
        <p>{value} {key === 'percentage_used' ? '%': 'GB'}</p>
      </div>
    ));
  };

  const renderDiskStats = () => {
    return data.Disks.map((disk, index) => (
      <div key={index} className="stat-card">
        <h3>{disk.label.replace(/_/g, ' ')}</h3> 
        <p>Free Space: {disk.free_space.toFixed(2)} GB</p>
        <p>Total Space: {disk.total_space.toFixed(2)} GB</p>
      </div>
    ));
  };

  return (
    <div className="system-stats-container">
      {renderRamStats()}
      <div className="stat-card">
        <h3>CPU Cores</h3>
        <p>{data['CPU Cores']}</p>
      </div>
      {renderDiskStats()}
    </div>
  );
};


const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${VITE_NODE_SERVER_URL}/system_info`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSystemInfo(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div >
      <div className="system-info-container">
      <h2 className='system-info-title'>Node Server</h2>
      {systemInfo ? (
        <div className="system-info-content">
          <SystemStats data={systemInfo}/>
        </div>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
          <CircularProgress />
        </Box>
      )}
      </div>
      
    </div>
  );
};

export default SystemInfo;
