// Navbar.jsx
import React from 'react';
import './general.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({toggleMenu}) => {
    return (
        <nav className="navbar">
            <div onClick={toggleMenu(true)} className="icon">
                <MenuIcon />
            </div>
            <div className="page-name">novatide labs</div>
            <div className="icon">
                <NotificationsNoneIcon/>
            </div>
        </nav>
    );
}

export default Navbar;
