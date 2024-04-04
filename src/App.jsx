import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar';
import SideMenu from './components/sideDrawer';
import Home from './home';
import Bots from './components/bots/bots';
import Boards from './components/bots/boards';
import Login from './components/login/login';
import { useSelector } from 'react-redux'

function App() {

  const [openMenu, setOpenMenu] = useState(false);
  const isLoggedIn = useSelector(state => state.isLoggedIn)


  const toggleMenu = (newOpen) => () => {
    setOpenMenu(newOpen);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <>
          {isLoggedIn && <Navbar toggleMenu={toggleMenu}  />}
          {isLoggedIn && <SideMenu toggleDrawer={toggleMenu} open={openMenu} />}
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/bots" exact element={<Bots />} />
            <Route path="/bots/:botName" exact element={<Boards />} />
          </Routes>
        </>
      ): <Login/>}
    </Router>
  );
}

export default App;
