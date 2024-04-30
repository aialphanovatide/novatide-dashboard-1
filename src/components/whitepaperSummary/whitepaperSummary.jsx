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
import pdfToText from "react-pdftotext"; // Importar la función pdfToText
import InfoSign from "./infoSign";
const BASE_URL = import.meta.env.VITE_API_URL;

const WhitepaperSummary = () => {
  const [label, setLabel] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [whitepapers, setWhitepapers] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const clearInputs = () => {
    setLabel("");
    setSummary("");
    setFile("");
  };
  const handleSubmit = async () => {
    setLoading(true);

    try {
      let pdfText = ""; // Inicializar pdfText aquí para que esté disponible fuera del bloque if

      if (file) {
        pdfText = await extractText(file); // Asignar el texto extraído a pdfText
      }

      // Añadir label y summary al formData
      const formData = new FormData();
      formData.append("label", label);
      formData.append("summary", summary);
      formData.append("pdfText", pdfText); // Agregar el texto extraído al formData

      // Envío de formData al servidor
      const response = await axios.post(
        `${BASE_URL}/create_whitepaper_analysis`,
        { label, summary, pdfText }
      );
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity("success");
      clearInputs();
      updateWhitepapers();
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

  const updateWhitepapers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get_whitepapers`);
      setWhitepapers(response.data.whitepapers);
    } catch (error) {
      console.error("Error fetching whitepapers:", error);
    }
  };

  // Función para extraer texto del PDF utilizando react-pdftotext
  const extractText = async (file) => {
    try {
      const text = await pdfToText(file);
      return text;
    } catch (error) {
      console.error("Failed to extract text from PDF:", error);
      throw error;
    }
  };

  return (
    <div style={{ width: "65%", margin: "auto" }}>
      <hr />
      <br />
      <br />
      <Typography variant="h4" gutterBottom>
        Whitepaper Analysis
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
        placeholder="Enter a prompt (you can use the information sign (?) poster to find out how to write it)."
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
          endAdornment: <InfoSign text="If you want to summarize a white paper using a PDF link, use a prompt similar to this: 'Go to [link] and make a summary'. If you want to provide a Google Docs link and summarize a white paper, write: 'Go to this Google Docs document [link] and make a summary'. And if you want to upload a PDF file and have it summarize a white paper using that file, write something like this: 'Please make a summary using this info:'" />, 
        }}
      />

      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <Tooltip title="This process may take 1 to 3 minutes" placement="top">
        <span>
          <br />
          <br />
          <Button
            sx={{ minWidth: 150 }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading || !label || !summary}
            style={{ marginRight: 8 }}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
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
        All Whitepaper Analysis
      </Typography>
      <WhitepapersTable
        whitepapers={whitepapers}
        updateWhitepapers={updateWhitepapers}
      />
    </div>
  );
};

export default WhitepaperSummary;
