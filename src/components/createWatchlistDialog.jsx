import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2'
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL

const CreateWatchlist = ({open, handleClick, setUpdateWatchlist}) => {

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');


    function handlecreate() {
        const data = {
            name: input1,
            description: input2
        };

        axios.post(`${BASE_URL}/create/watchlist`, data)
        .then(response => {
            if (response.data.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Watchlist created",
                    showConfirmButton: false,
                    timer: 1500
                  });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.error,
                  });
            }
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
            })
        })
        .finally(() => {
            handleClick()
            setUpdateWatchlist(true)
        });
        
    }


  return (
    <div>
      <Dialog open={open} onClose={handleClick}>
        <DialogTitle>Create Watchlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please complete the following information
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name *"
            type="text"
            fullWidth
            value={input1}
            style={{marginTop: '1rem'}}
            onChange={(e) => setInput1(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={input2}
            style={{marginTop: '1rem'}}
            onChange={(e) => setInput2(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="primary">
            Cancel
          </Button>
          <Button disabled={!input1} onClick={handlecreate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateWatchlist;
