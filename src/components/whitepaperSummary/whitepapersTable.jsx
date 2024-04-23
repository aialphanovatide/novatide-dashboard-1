import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const BASE_URL = import.meta.env.VITE_API_URL;

const WhitepapersTable = ({ updateWhitepapers }) => {
  const [whitepapers, setWhitepapers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchWhitepapers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get_whitepapers`);
        setWhitepapers(response.data.whitepapers);
      } catch (error) {
        console.error("Error fetching whitepapers:", error);
      }
    };

    fetchWhitepapers();
  }, [updateWhitepapers]);

  const [expandedRows, setExpandedRows] = useState({});

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete_whitepaper_analysis?id=${id}`);
      // Actualiza la lista de whitepapers después de eliminar uno
      updateWhitepapers();
    } catch (error) {
      console.error("Error deleting whitepaper:", error);
    }
  };

  const toggleExpand = (id) => {
    setExpandedRows({
      ...expandedRows,
      [id]: !expandedRows[id],
    });
  };

  const renderPerplexitySummary = (whitepaper) => {
    const maxLines = 5;
    const shouldExpand = expandedRows[whitepaper.id];
    const summaryLines = whitepaper.perplexity_summary.split("\n");
    const displayLines = shouldExpand ? summaryLines : summaryLines.slice(0, maxLines);
    const showMoreButton = summaryLines.length > maxLines && !shouldExpand;
    const showLessButton = shouldExpand;

    return (
      <div>
        {displayLines.map((line, index) => (
          <Typography key={index} variant="body2" gutterBottom>
            {line}
          </Typography>
        ))}
        {showMoreButton && (
          <IconButton onClick={() => toggleExpand(whitepaper.id)}>
            <ExpandMoreIcon />
          </IconButton>
        )}
        {showLessButton && (
          <IconButton onClick={() => toggleExpand(whitepaper.id)}>
            <ExpandLessIcon />
          </IconButton>
        )}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const filteredWhitepapers = whitepapers.filter(
    (whitepaper) =>
      whitepaper.label.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Search by Label / Coin"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
            style: {
              backgroundColor: "white",
            },
          }}
      />
      <br></br>
      <br></br>
      <TableContainer  component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{textAlign: 'center', fontWeight: 'bold'}}>
              <TableCell sx={{textAlign: 'center', fontWeight: 'bold'}}>Label / Coin</TableCell>
              <TableCell sx={{textAlign: 'center', fontWeight: 'bold'}}>Whitepaper Analysis</TableCell>
              <TableCell sx={{textAlign: 'center', fontWeight: 'bold'}}>Created At</TableCell>
              <TableCell sx={{textAlign: 'center', fontWeight: 'bold'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredWhitepapers.map((whitepaper) => (
              <TableRow key={whitepaper.id}>
                <TableCell>{whitepaper.label}</TableCell>
                <TableCell>
                  {renderPerplexitySummary(whitepaper)}
                </TableCell>
                <TableCell>{formatDate(whitepaper.created_at)}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDelete(whitepaper.id)}
                    color="warning"
                  
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default WhitepapersTable;
