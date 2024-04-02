// Navbar.jsx
import React from 'react';
import './general.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({toggleMenu}) => {
    return (
        <nav className="navbar">
            <div className="navbar-subcontainer-1">
                <div className='menu-icon' onClick={toggleMenu(true)}>
                    <MenuIcon />
                </div>
                <div className="page-name">novatide labs</div>
            </div>
            <div className="navbar-subcontainer-2">
                <NotificationsNoneIcon/>
            </div>
        </nav>
    );
}

export default Navbar;
