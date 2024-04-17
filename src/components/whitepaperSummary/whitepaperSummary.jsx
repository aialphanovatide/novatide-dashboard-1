import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import WhitepapersTable from "./whitepapersTable";

const BASE_URL = import.meta.env.VITE_API_URL;

const WhitepaperSummary = () => {
  const [label, setLabel] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [whitepapers, setWhitepapers] = useState([]); // Estado para almacenar los whitepapers

  // Función para actualizar los whitepapers después de crear uno nuevo
  const updateWhitepapers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get_whitepapers`);
      setWhitepapers(response.data.whitepapers);
    } catch (error) {
      console.error("Error fetching whitepapers:", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/create_whitepaper_analysis`,
        { label, summary }
      );
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity("success");
      updateWhitepapers(); // Actualiza los whitepapers después de crear uno nuevo
    } catch (error) {
      setSnackbarMessage(
        error.response?.data?.message || "An unexpected error occurred"
      );
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div style={{ width: "65%", margin: "auto" }}>
      <hr />
      <br />
      <br />
      {/* Sección de creación de resumen de whitepaper */}
      <Typography variant="h4" gutterBottom>
        Create a Whitepaper Summary
      </Typography>
      <TextField
        label="Label / Coin"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          style: {
            backgroundColor: "white",
          },
        }}
      />
      <TextField
        label="Prompt"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        fullWidth
        multiline
        rows={4}
        margin="normal"
        InputProps={{
          style: {
            backgroundColor: "white",
          },
        }}
      />
      <Tooltip title="This process may take 1 to 3 minutes" placement="top">
        <span>
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            style={{ marginRight: 8 }}
          >
            Submit
          </Button>
          {loading && <CircularProgress size={24} />}
        </span>
      </Tooltip>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert elevation={6} variant="filled" severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <br />
      <br />
      <br />
      <hr />
      <br />
      <br />
      <Typography variant="h4" gutterBottom>
        All Whitepaper Summaries
      </Typography>
      <WhitepapersTable
        whitepapers={whitepapers}
        updateWhitepapers={updateWhitepapers}
      />
    </div>
  );
};

export default WhitepaperSummary;
