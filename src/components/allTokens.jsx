import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

const BASE_URL = import.meta.env.VITE_API_URL;

function formatNumber(number) {
  // Check if the number is an integer or decimal
  if (Number.isInteger(number)) {
    // Format integer numbers with thousands separators
    return number.toLocaleString();
  } else {
    // Split the number into integer and decimal parts
    let parts = number.toLocaleString().split('.');
    // Format integer part with thousands separators
    parts[0] = parts[0].replace(/,/g, '');
    parts[0] = parseInt(parts[0]).toLocaleString();
    // Join the integer and decimal parts and return
    return parts.join('.');
  }
}

export default function AllTokens({ updateList }) {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('symbol');
  const [selected, setSelected] = useState([]);
  const [updateToken, setUpdateToken] = useState(false);

  // Deletes token selected
  const handleDelete = async (idsToDelete) => {
    try {
      const response = await fetch(`${BASE_URL}/delete/tokens`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: idsToDelete })
      });

      const responseData = await response.json();

      // After successful deletion, trigger refetch
      setUpdateToken(prevState => !prevState);
      setSelected([])
    } catch (error) {
      console.log('error: ', error)
    }
  };

  // Executes the handlesubmit just when there's a selected token
  const submitDelete = () => {
    if (selected.length > 0) {
      handleDelete(selected)
    }
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;


  // Gets all the tokens data
  useEffect(() => {
    const apiUrl = `${BASE_URL}/get/tokens`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setData(data.response);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [updateToken, updateList]);

  function organizeProps(array) {
    const organizedArray = array.map(obj => {
        const { logo, symbol, gecko_id, updated_at, created_at, ...rest } = obj;
        return { logo, symbol, gecko_id, ...rest, updated_at, created_at };
    });
    return organizedArray;
}

  const organizedTokens = data && organizeProps(data)
  console.log(organizedTokens)

  // Sort the data based on orderBy and order
  const sortedData = organizedTokens && organizedTokens?.slice().sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  // Organize the order to display the column titles
  const idLogoGeckoId = ["logo", "symbol", "gecko_id"];
  const dates = ["created_at", "updated_at"];
  const columnTitle = data.length > 0 && Object.keys(data[0]);

  // Exclude items from idLogoGeckoId and dates
  const filteredColumnTitles = columnTitle && columnTitle.filter(key => !idLogoGeckoId.includes(key) && !dates.includes(key));

  // Concatenate in the specified order
  const organizedColumnTitles = idLogoGeckoId.concat(filteredColumnTitles, dates);


  // Function to format the title by replacing underscores with spaces
  const formatTitle = (title) => {
    if (title){
      return title.replace(/_/g, ' ');
    }
  }

  return (
    <div className='table-main'>
      <h2 className='table-title'>Watchlist</h2>
      <Paper>
        <Toolbar>
          <Typography variant="h6" id="tableTitle" component="div">
            {selected.length > 0 ? `${selected.length} Selected` : 'Watchlist'}
          </Typography>
          <Tooltip title={selected.length > 0 ? 'Delete' : 'Filter list'}>
            <IconButton onClick={submitDelete}>
              {selected.length > 0 ? <DeleteIcon /> : <FilterListIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <Table>
            <caption>Here you can see all the tokens in the watchlist</caption>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#023e7d' }} padding="checkbox">
                  <Checkbox
                    color="primary"
                    style={{ color: '#fff' }}
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
                {/* {data.length > 0 && Object.keys(data[0]).map(key => { */}
                {organizedColumnTitles.length > 0 && organizedColumnTitles?.map(key => {
                  if (key !== 'success' && key !== 'id') {
                    return (
                      <TableCell
                        key={key}
                        sx={{ backgroundColor: '#023e7d', color: '#fff', textAlign: 'center', minWidth: 140, verticalAlign: 'center', textTransform: 'capitalize' }}
                        className='table-cell-header'
                        align="left"
                        
                      >
                        <TableSortLabel
                          active={orderBy === key}
                          direction={orderBy === key ? order : 'asc'}
                          onClick={() => handleRequestSort(key)}
                        >
                          {formatTitle(key)}
                          {orderBy === key ? (
                            <span style={visuallyHidden}>
                              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    )
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map(item => (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, item.id)}
                  role="checkbox"
                  aria-checked={isSelected(item.id)}
                  tabIndex={-1}
                  key={item.id}
                  selected={isSelected(item.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isSelected(item.id)}
                    />
                  </TableCell>
                  {Object.keys(item).map(key => {
                    // Exclude "success" column
                    if (key !== "success" && key !== 'id') {
                      return (
                        <TableCell
                          sx={{
                            color: '#282828',
                            textAlign: 'center',
                            verticalAlign: 'center',
                          }}
                          key={key}
                          align="right"
                        >
                          {typeof item[key] === 'string' && item[key].startsWith('https://assets.') ? (
                            <img src={item[key]} alt={`Logo for ${key}`} style={{ maxWidth: '100px' }} />
                          ) : typeof item[key] === 'string' && item[key].startsWith('http') ? (
                            <a href={item[key]} target="_blank" rel="noopener noreferrer">
                              {item[key]}
                            </a>
                          ) : (
                            typeof item[key] === 'number' ? `${formatNumber(item[key])}` : item[key]
                          )}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
