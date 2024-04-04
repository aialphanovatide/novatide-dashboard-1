import React from 'react';
import './general.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Box, Menu, Tooltip } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import axios from 'axios';
import { signOut } from '../redux/slices/appSlice';

const BASE_URL = import.meta.env.VITE_API_URL
const settings = ['Profile', 'Logout'];

const Navbar = ({ toggleMenu }) => {

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const currentUser = useSelector(state => state.user)
    const dispatch = useDispatch();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        
        try {
        // Perform logout action
        const response = await axios.post(`${BASE_URL}/logout`, {
            username: currentUser.username,
        });

        if ( response.status === 200 ){
            dispatch(signOut());
        } else {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.error
            });
        }
        } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:  error.message
        });
        }
        
      };


    return (
        <nav className="navbar">
            <div className="navbar-subcontainer-1">
                <div className='menu-icon' onClick={toggleMenu(true)}>
                    <MenuIcon />
                </div>
                <NavLink to='/' className="page-name">novatide labs</NavLink>
            </div>
            <div className="navbar-subcontainer-2">
                <NotificationsNoneIcon className='bell' />
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>{currentUser && String(currentUser.username).substring(0, 2).toUpperCase()}</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </div>
        </nav>
    );
}

export default Navbar;
