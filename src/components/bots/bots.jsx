import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../general.css'; 
import CircularProgress from '@mui/material/CircularProgress';

const BASE_URL_MONDAY_BOT = import.meta.env.VITE_NOVATIDE_MONDAY_BOT_URL;



const BotItem = ({ item }) => {
  const botLink = `/bots/${item.name}`;

  return (
    <Link to={botLink} className='bot-link'>
      <div className='bot-item'>
        <h2 className='bot-name'>{item.name}</h2>
        <p className='bot-description'>{item.description}</p>
        <div className='bot-details'>
          <p className={`bot-status ${item.status ? 'active' : 'inactive'}`}>
            {item.status ? 'Active' : 'Inactive'}
          </p>
          <div className="bot-time-info">
            <span className='bot-run-time-label'>Next Run Time:</span>
            <p className='bot-run-time'>{item.next_run_time}</p>
            <span className='bot-updated-label'>Last Updated:</span>
            <p className='bot-updated'>{item.updated_at}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Bots = () => {
  const [bots, setBots] = useState([]);

  // Get all Novatide Bots
  useEffect(() => {
    const getBots = async () => {
      try {
        const response = await axios.get(`${BASE_URL_MONDAY_BOT}/bots`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.status === 200) {
          const data = response.data;
          setBots(data.bots);
        }
      } catch (error) {
        console.error('Error fetching gas price:', error);
      }
    };

    getBots();
  }, []);

  return (
    <div className='bots-container'>
      <div className='bots-subcontainer'>
        {bots.length > 0 ? bots.map((item, index) => (
          <BotItem key={index} item={item} />
        )): <div className='loader-container'>{<CircularProgress />}</div>  }
      </div>
    </div>
  );
};

export default Bots;
