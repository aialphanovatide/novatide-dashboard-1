import { Button, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import '../general.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/slices/appSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const BASE_URL = import.meta.env.VITE_API_URL

const Login = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Perform validation
    let errorsObj = {};
    if (!formData.username) {
      errorsObj.username = 'Username is required';
    }
    if (!formData.password) {
      errorsObj.password = 'Password is required';
    }
    setErrors(errorsObj);

    // If no errors, perform login action
    if (Object.keys(errorsObj).length === 0) {
      try {
        // Perform login action
        const response = await axios.post(`${BASE_URL}/login`, {
          username: formData.username,
          password: formData.password
        });

      
        if (response.data.user.is_authenticated){
            dispatch(signIn(response.data.user));
        }
      } catch (error) {
        if (error.response.data.error){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text:  error.response.data.error
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text:  error.message
          });
        }
      }
    }
  };
  

  return (
    <div className="login-container">
          <Typography className='login-title' fontWeight={500} marginTop='10rem' variant="h5" align="center" gutterBottom>
            Login to Novatide Labs
          </Typography>
          <form className="login-form" onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              type="username"
              value={formData.username}
              onChange={handleChange}
              className="text-field"
              error={!!errors.username}
              helperText={errors.username}
              sx={{marginBottom: '1rem', width: '100%', backgroundColor: '#fff'}}
            />
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="text-field"
              error={!!errors.password}
              helperText={errors.password}
              sx={{marginBottom: '1rem', width: '100%', backgroundColor: '#fff'}}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
    </div>
  );
};

export default Login;
