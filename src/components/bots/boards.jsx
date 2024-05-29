import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';

const BASE_URL_MONDAY_BOT = import.meta.env.VITE_NOVATIDE_MONDAY_BOT_URL;

const Boards = () => {
    const [boards, setBoards] = useState([]);
    const { botName } = useParams();

    let key = 'master sheet'
    if (botName === 'nv invest - monitor'){
        key = 'take profit'
    }

    console.log('botName: ', botName)
    
    // Function to fetch all Monday Boards
    useEffect(() => {
        const getBoards = async () => {
            try {
                const response = await axios.get(`${BASE_URL_MONDAY_BOT}/search_boards?query=${key}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.status === 200) {
                    const data = response.data;
                    console.log('data: ', data)
                    setBoards(data.data);
                }
            } catch (error) {
                console.error('Error fetching boards:', error);
            }
        };

        getBoards();
    }, []); 

    return (
        <div className="boards-container">
            {botName && botName === 'fundamental analysis' ? (
                <div className='fundamental-analysis-container'>
                    <h2 className='fa-title'>{botName}</h2>
                    <h4>No available information yet</h4>
                </div>
            ) : (
                <React.Fragment>
                    <h1 className='monday-boards-title'>Monday Boards</h1>
                    <div>
                        {boards.length === 0 ? (
                            <div className="loader-container">
                                <CircularProgress />
                            </div>
                        ) : (
                            <div className="boards">
                                {boards.map((item, index) => (
                                    <a href={`https://novatidelabs-company.monday.com/boards/${item.monday_board_id}`} key={index} className="board-item">
                                        <p className="board-name">{item.board_name}</p>
                                        <p className="board-id">{item.monday_board_id}</p>
                                        <p className="created-at">{item.created_at.substring(0, 16)}</p>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default Boards;
