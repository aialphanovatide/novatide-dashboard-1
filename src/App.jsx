import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import SideMenu from './components/sideDrawer';
import Home from './home';
import Bots from './components/bots/bots';
import Boards from './components/bots/boards';
import Node from './components/nodes/node';

function App() {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = (newOpen) => () => {
    setOpenMenu(newOpen);
  };

  return (
    <Router>
      <Navbar toggleMenu={toggleMenu} />
      <SideMenu toggleDrawer={toggleMenu} open={openMenu} />
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/bots" exact element={<Bots/>} />
        <Route path="/nodes" exact element={<Node/>} />
        <Route path="/bots/:botName" exact element={<Boards/>} />
      </Routes>
    </Router>
  );
}

export default App;














// import TokenDetailsDialog from './components/tokenDetailsDialog';
// import Swal from 'sweetalert2'
// import AllTokens from './components/allTokens';
// import axios from 'axios';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import { Button, FormControl, InputLabel } from '@mui/material';
// import CreateWatchlist from './components/createWatchlistDialog';


// const [updateWatchlist, setUpdateWatchlist] = useState(false);
// const [openCreateWatchlist, setOpenCreateWatchlist] = useState(false);

// const handleClickOpenCreateWatchlistDialog = () => {
//   setOpenCreateWatchlist(!openCreateWatchlist);
// };


// const BASE_URL = import.meta.env.VITE_API_URL


// function formatNumber(number) {
//   // Check if the number is an integer or decimal
//   if (Number.isInteger(number)) {
//     // Format integer numbers with thousands separators
//     return number.toLocaleString();
//   } else {
//     // Split the number into integer and decimal parts
//     let parts = number.toLocaleString().split('.');
//     // Format integer part with thousands separators
//     parts[0] = parts[0].replace(/,/g, '');
//     parts[0] = parseInt(parts[0]).toLocaleString();
//     // Join the integer and decimal parts and return
//     return parts.join('.');
//   }
// }


// const [input1, setInput1] = useState('');
// const [input2, setInput2] = useState('');
// const [open, setOpen] = React.useState(false);
// const [selectedWatchlist, setSelectedWatchlist] = useState('');
// const [buttonDisabled, setButtonDisabled] = useState(true);
// const [tokenResponse, setTokenResponse] = useState(null); // State to hold token response
// const [updateList, setUpdateList] = useState(false); // State to update the list of token
// const [watchlist, setWatchlist] = useState([]);
// const [tokenData, setTokenData] = useState(null);


// const handleResponseReceived = (data) => {
//   setTokenData(data);
// };

// // Function to fetch watchlist data
// const fetchWatchlistData = async () => {
//   try {
//     const apiUrl = `${BASE_URL}/watchlists/nontokens`;
//     const response = await axios.get(apiUrl);

//     if (response.status === 200) {
//       setWatchlist(response.data.watchlists);
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

// useEffect(() => {
//   fetchWatchlistData();
// }, [updateWatchlist]);


// const handleInput1Change = (event) => {
//   setInput1(event.target.value);
//   setButtonDisabled(event.target.value === '');
// };

// const handleInput2Change = (event) => {
//   setInput2(event.target.value);
// };

// const handleSelectedWachlist = (event) => {
//   setSelectedWatchlist(event.target.value);
// };

// const handleClose = () => {
//   setOpen(false);
// };

// // Get details about a Token
// const handleSubmit = () => {
//   setTokenResponse(null)
//   fetch(`${BASE_URL}/search/token`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       token_name: input1,
//       token_symbol: input2,
//       watchlist: selectedWatchlist
//     })
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) {
//         setTokenResponse(data)
//         setOpen(true)
//         setUpdateList(prevState => !prevState);
//       } else if (data.response == "Token not found") {
//         setTokenResponse(data.response)
//         setOpen(true)
//       } else {
//         Swal.fire({
//           title: "Something went wrong",
//           text: data.response,
//           icon: "error"
//         });
//       }
//     })
//     .catch((error) => {
//       Swal.fire({
//         title: "Something went wrong",
//         text: error,
//         icon: "error"
//       });
//     });
// };


{/* <div className='create-watchlist-container'>
          <Button
            className='create-watchlist-btn'
            onClick={handleClickOpenCreateWatchlistDialog}
            variant="outlined">create watchlist</Button>
          <CreateWatchlist setUpdateWatchlist={setUpdateWatchlist} open={openCreateWatchlist} handleClick={handleClickOpenCreateWatchlistDialog} />
        </div> */}


{/* <h2 style={{color: '#282828'}}>Search token</h2>
        <div className="input-group">
          <label htmlFor="input1">Token Name:</label>
          <input
            id="input1"
            style={{backgroundColor: '#fff', color: '#282828'}}
            type="text"
            placeholder="Enter token name"
            value={input1}
            aria-autocomplete='inline'
            onChange={handleInput1Change}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="input2">Token Symbol:</label>
          <input
            id="input2"
            type="text"
            style={{backgroundColor: '#fff', color: '#282828'}}
            placeholder="Enter token symbol"
            value={input2}
            onChange={handleInput2Change}
            required
          />
        </div>
        <div className="input-group-2">
          <FormControl variant="filled" sx={{ m: 2, minWidth: '100%' }}>
            <InputLabel id="demo-simple-select-filled-label">Watchlist</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled-label"
              value={selectedWatchlist}
              onChange={handleSelectedWachlist}
              label="Watchlist"
              style={{textTransform: 'capitalize'}}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {watchlist && watchlist?.map(item => {
                return (
                  <MenuItem style={{textTransform: 'capitalize'}} key={item.id} value={item.name}>{item.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>
        <button className='submit' onClick={handleSubmit} disabled={buttonDisabled}>
          Search
        </button>

        {tokenResponse && <TokenDetailsDialog open={open}
          tokenName={input1}
          handleClose={handleClose}
          tokenResponse={tokenResponse}
          onResponseReceived={handleResponseReceived}
          setUpdateList={setUpdateList}
        />} */}

{/* ------------------------TOKEN DATA-----------------------------------------------------------

        {tokenData && <div className='tokenData-main-container'>

          <h2 className='token-title'>Token details</h2>

          <div className='tokenData-item'>
            <img className='logo' src={tokenData.response.response.coingecko_response.success === true && tokenData.response.response.coingecko_response.logo ?
              tokenData.response.response.coingecko_response.logo : ''}
              alt="Logo" />
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>ID:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.id ?
              tokenData.response.response.coingecko_response.id : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>Token symbol:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true && tokenData.response.response.coingecko_response.symbol ?
              tokenData.response.response.coingecko_response.symbol : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>Analysis 1:</p>
            <p className='tokenData-value'>{tokenData.response.response.analysis_1.success === true ?
              tokenData.response.response.analysis_1.response : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>Analysis 2:</p>
            <p className='tokenData-value'>{tokenData.response.response.analysis_2.success === true ?
              tokenData.response.response.analysis_2.response : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>ATH:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true && tokenData.response.response.coingecko_response.ath ?
              `$${formatNumber(tokenData.response.response.coingecko_response.ath)}` : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>ATH percentage change:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.ath_change_percentage ?
              `${tokenData.response.response.coingecko_response.ath_change_percentage}%` : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>categories:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true && tokenData.response.response.coingecko_response.categories ?
              tokenData.response.response.coingecko_response.categories : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>chains:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.chains ?
              tokenData.response.response.coingecko_response.chains : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>circulating supply:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.circulating_supply ?
              formatNumber(tokenData.response.response.coingecko_response.circulating_supply) : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>coingecko link:</p>
            <a style={{ color: 'blue' }} href={tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.coingecko_link ?
              tokenData.response.response.coingecko_response.coingecko_link : 'N/A'}>{tokenData.response.response.coingecko_response.success === true &&
                tokenData.response.response.coingecko_response.coingecko_link ?
                tokenData.response.response.coingecko_response.coingecko_link : 'N/A'}</a>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>contracts:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.contracts ?
              tokenData.response.response.coingecko_response.contracts : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>current price:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.current_price ?
              `$${formatNumber(tokenData.response.response.coingecko_response.current_price)}` : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>fully diluted valuation:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.fully_diluted_valuation ?
              formatNumber(tokenData.response.response.coingecko_response.fully_diluted_valuation) : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>market cap usd:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.market_cap_usd ?
              formatNumber(tokenData.response.response.coingecko_response.market_cap_usd) : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>max supply:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.max_supply ?
              tokenData.response.response.coingecko_response.max_supply : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>percentage circulating supply:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.percentage_circulating_supply ?
              `${tokenData.response.response.coingecko_response.percentage_circulating_supply}%` : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>price a year ago:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.price_a_year_ago ?
              `$${formatNumber(tokenData.response.response.coingecko_response.price_a_year_ago)}` : 'N/A'}</p>
          </div>

          <div className='tokenData-item'>
            <p className='tokenData-title'>price change percentage (1y):</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.price_change_percentage_1y ?
              `${tokenData.response.response.coingecko_response.price_change_percentage_1y}%` : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>supply_model:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.supply_model ?
              tokenData.response.response.coingecko_response.supply_model : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>total supply:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.total_supply ?
              formatNumber(tokenData.response.response.coingecko_response.total_supply) : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>total volume:</p>
            <p className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.total_volume ?
              formatNumber(tokenData.response.response.coingecko_response.total_volume) : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>website:</p>
            <a style={{ color: 'blue' }} href={tokenData.response.response.coingecko_response.success === true &&
              tokenData.response.response.coingecko_response.website ?
              tokenData.response.response.coingecko_response.website : 'N/A'} className='tokenData-value'>{tokenData.response.response.coingecko_response.success === true &&
                tokenData.response.response.coingecko_response.website ?
                tokenData.response.response.coingecko_response.website : 'N/A'}</a>
          </div>

          <div className='tokenData-item'>
            <p className='tokenData-title'>whitepaper:</p>
            <a style={{ color: 'blue' }} href={tokenData.response.response.coinmarketcap_response.success === true ?
              tokenData.response.response.coinmarketcap_response.whitepaper : 'N/A'} className='tokenData-value'>{tokenData.response.response.coinmarketcap_response.success === true ?
                tokenData.response.response.coinmarketcap_response.whitepaper : 'N/A'}</a>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>TVL:</p>
            <p className='tokenData-value'>{tokenData.response.response.defillama_chains_response.success === true &&
              tokenData.response.response.defillama_chains_response.tvl ?
              formatNumber(tokenData.response.response.defillama_chains_response.tvl) : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>annualized revenue fee:</p>
            <p className='tokenData-value'>{tokenData.response.response.staking_reward_response.success === true &&
              tokenData.response.response.staking_reward_response.annualized_revenue_fee ?
              formatNumber(tokenData.response.response.staking_reward_response.annualized_revenue_fee) : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>inflation rate:</p>
            <p className='tokenData-value'>{tokenData.response.response.staking_reward_response.success === true &&
              tokenData.response.response.staking_reward_response.inflation_rate ?
              formatNumber(tokenData.response.response.staking_reward_response.inflation_rate) : 'N/A'}</p>
          </div>
          <div className='tokenData-item'>
            <p className='tokenData-title'>reward rate:</p>
            <p className='tokenData-value'>{tokenData.response.response.staking_reward_response.success === true &&
              tokenData.response.response.staking_reward_response.reward_rate ?
              formatNumber(tokenData.response.response.staking_reward_response.reward_rate) : 'N/A'}</p>
          </div>
        </div>}


        <AllTokens updateWatchlist={updateWatchlist} updateList={updateList} /> */}