// Navbar.jsx
import React from 'react';
import './general.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* <div className="logo">
                <img src="/path/to/logo.png" />
            </div> */}
            <div className="page-name">novatide labs</div>
            {/* <div className="icon">
                <NotificationsNoneIcon/>
            </div> */}
        </nav>
    );
}

export default Navbar;
