import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const VITE_NODE_SERVER_URL = import.meta.env.VITE_NODE_SERVER_URL;

const SystemStats = ({ data }) => {
    return (
      <div className="system-stats-container">
        <div className="stat-card">
          <h3>Available RAM</h3>
          <p>{data['Available RAM']} GB</p>
        </div>
        <div className="stat-card">
          <h3>CPU Cores</h3>
          <p>{data['CPU Cores']}</p>
        </div>
        <div className="stat-card">
          <h3>Disk Space</h3>
          <p>{data['Disk Space']} GB</p>
        </div>
        <div className="stat-card">
          <h3>Download Speed</h3>
          <p>{data['Download Speed']} Mbps</p>
        </div>
        <div className="stat-card">
          <h3>RAM Used Percentage</h3>
          <p>{data['RAM Used Percentage']}%</p>
        </div>
        <div className="stat-card">
          <h3>Total RAM</h3>
          <p>{data['Total RAM']} GB</p>
        </div>
        <div className="stat-card">
          <h3>Upload Speed</h3>
          <p>{data['Upload Speed']} Mbps</p>
        </div>
      </div>
    );
  };

const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState(null);
  console.log(systemInfo)

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
    <div className="system-info-container">
      <h2 className='system-info-title'>System Information</h2>
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
  );
};

export default SystemInfo;
