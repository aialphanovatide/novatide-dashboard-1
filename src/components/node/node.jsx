
import React, { useState, useEffect } from 'react';
import './Nodes.css'; 
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SystemInfo from './system';

const VITE_NODE_SERVER_URL = import.meta.env.VITE_NODE_SERVER_URL;

const Nodes = () => {
  const [dockerInfo, setDockerInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${VITE_NODE_SERVER_URL}/docker_info`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDockerInfo(data.data.containers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="nodes-container">
      <SystemInfo/>
      <h2 className='nodes-title'>Docker - Nodes</h2>
      <div className="nodes-subcontainer">
        {dockerInfo.length > 0 ? dockerInfo.map((node, index) => (
            <div className={`node-card ${node.status === 'running' ? 'running' : 'offline'}`} key={index}>
            <h2 style={{fontSize: '1.2rem'}}>{node.name}</h2>
            <p>Status: {node.status}</p>
            <p>Created: {new Date(node.created).toLocaleString()}</p>
            <p>Image: {node.image}</p>
          </div>
        )) :  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box> }
      </div>
    </div>
  );
};

export default Nodes;
