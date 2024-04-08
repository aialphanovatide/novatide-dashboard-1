import React, { useState } from 'react';
import { TextField, Button, Snackbar, Select, MenuItem } from '@mui/material';
import { Alert } from '@mui/material';
import axios from 'axios';
import '../general.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const CreateUserForm = ({setUpdateUserTable}) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/create_user`, formData);
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setUpdateUserTable(true)
      // Clear form data after successful submission
      setFormData({
        username: '',
        email: '',
        password: '',
        role: ''
      });
    } catch (error) {
      if (error.response) {
        setSnackbarMessage(error.response.data.error);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage('Something went wrong. Please try again later.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form className='formContainer' onSubmit={handleSubmit}>
        <h2 className='create-user-title'>create user</h2>
        <TextField
          sx={{marginBottom: '1rem'}}
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          sx={{marginBottom: '1rem'}}
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          sx={{marginBottom: '1rem'}}
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
          InputProps={{
            endAdornment: (
              <Button onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </Button>
            )
          }}
        />
        <Select
          sx={{marginBottom: '1rem'}}
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          fullWidth
          placeholder='Role'
        >
          <MenuItem disabled>Role</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
        <Button fullWidth disabled={!formData.email || !formData.password || !formData.role || !formData.username} type="submit" variant="contained" color="primary">
          Create User
        </Button>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateUserForm;
