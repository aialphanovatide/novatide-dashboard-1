import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Outlet, NavLink, useLocation } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TokenIcon from '@mui/icons-material/Token';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import './general.css'

export default function SideMenu({ toggleDrawer, open }) {
  const location = useLocation();

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List style={{padding: 0}}>
        {[
          { text: 'Home', path: '/' },
          { text: 'Bots', path: '/bots' },
          { text: 'Nodes', path: '/nodes' }
        ].map((item, index) => (
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
            <ListItem  className='list-item-sideBar' disablePadding>
              <ListItemButton
                style={{
                  backgroundColor: location.pathname === item.path ? 'lightblue' : 'inherit'
                }}
              >
                <ListItemIcon>
                  {item.text === 'Nodes' ? <ViewInArIcon /> : (index % 2 === 0 ? <DashboardIcon /> : <TokenIcon />)}
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
