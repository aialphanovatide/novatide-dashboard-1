import './general.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import GroupIcon from '@mui/icons-material/Group';
import TokenIcon from '@mui/icons-material/Token';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink, useLocation } from "react-router-dom";
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemButton from '@mui/material/ListItemButton';
import { useSelector } from 'react-redux'
import FindInPageIcon from '@mui/icons-material/FindInPage';

export default function SideMenu({ toggleDrawer, open }) {
  const location = useLocation();
  const currentUser = useSelector(state => state.user)

  // Define the menu items with text, path, and icon
  const menuItems = [
    { text: 'Home', path: '/', icon: <DashboardIcon /> },
    { text: 'Bots', path: '/bots', icon: <TokenIcon /> },
    { text: 'Nodes', path: '/nodes', icon: <ViewInArIcon /> },
    { text: 'Whitepaper', path: '/whitepaper', icon: <FindInPageIcon /> }, 
    ...(currentUser.role === 'admin' ? [{ text: 'Users', path: '/users', icon: <GroupIcon /> }] : [])
  ];
  
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List style={{padding: 0}}>
        {menuItems.map((item, index) => (
          <NavLink
            key={item.text}
            to={item.path}
            style={({ isActive, isPending, isTransitioning }) => ({
              fontWeight: isActive ? "bold" : "",
              color: isPending ? "red" : "black",
              viewTransitionName: isTransitioning ? "slide" : "",
              textDecoration: 'none',
            })}
          >
            <ListItem className='list-item-sideBar' disablePadding>
              <ListItemButton
                style={{
                  backgroundColor: location.pathname === item.path ? 'lightblue' : 'inherit'
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        PaperProps={{
          sx: {
            height: 'calc(100% - 64px)',
            top: 64,
          },
        }}
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
