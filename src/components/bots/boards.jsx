import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const BASE_URL_MONDAY_BOT = import.meta.env.VITE_NOVATIDE_MONDAY_BOT_URL;

const Boards = () => {

    const [boards, setBoards] = useState([]);

    // Function to fetch all Monday Boards
    useEffect(() => {
        const getBoards = async () => {
            try {
                const response = await axios.get(`${BASE_URL_MONDAY_BOT}/get_all_boards`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.status === 200) {
                    const data = response.data;
                    setBoards(data.boards);
                }
            } catch (error) {
                console.error('Error fetching boards:', error);
            }
        };

        getBoards();
    }, []);

    return (
        <div className="boards-container">
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

        </div>
    );
};

export default Boards;
