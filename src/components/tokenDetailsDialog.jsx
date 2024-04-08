import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import DialogContentText from '@mui/material/DialogContentText';
import './general.css'
import Swal from 'sweetalert2';

const BASE_URL = import.meta.env.VITE_API_URL


export default function TokenDetailsDialog({ open, handleClose, tokenResponse, tokenName, onResponseReceived, setUpdateList }) {

    const [loading, setLoading] = React.useState(false);
    const [prompt, setPrompt] = React.useState('');

    const handlePrompt = (event) => {
        setPrompt(event.target.value);
      };


    // Get all available information about a token.
    const handleSubmit = (token, prompt) => {
    setLoading(true);

    let url = `${BASE_URL}/activate/multi_bot?token_name=${token}`;
    if (prompt && prompt.trim() !== '') {
        url += `&analysis_prompt=${prompt}`;
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
            onResponseReceived(data);
            handleClose()
        } else {
          Swal.fire({
            title: "Something went wrong",
            text: data.response,
            icon: "error"
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Something went wrong",
          text: error,
          icon: "error"
        });
      })
      .finally(() => {
        setLoading(false); // Set loading state back to false when data fetching is complete
        setUpdateList(prevState => !prevState);
    });
    };

    const targetToken  = typeof tokenResponse !== "object"? tokenName : tokenResponse.response.token_id
  
    return (
        <React.Fragment>
            <Dialog
                className='dialog'
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    Token Details
                </DialogTitle>

                <DialogContentText className='dialog-subTitle'>
                {typeof tokenResponse === "object"? "If this is the token you are seeking information for, please press 'Search'.":
                 "The token was not found, if you still wish to search all available information, please press 'Search'."
                }
                </DialogContentText>
                
                { typeof tokenResponse === "object" && tokenResponse !== null?
                <DialogContent className='token-details-dialog-content'>
                    <div className='token-details-item'>
                        <p className='token-details-title'><strong>Token ID:</strong></p>
                        <p className="token-id">{tokenResponse.response.token_id}</p>
                    </div>
                    <div className='token-details-item'>
                        <p className='token-details-title'><strong>Token Name:</strong></p>
                        <p className="token-id">{tokenResponse.response.token_name}</p>
                    </div>
                    <div className='token-details-item'>
                        <p className='token-details-title'><strong>Token Symbol:</strong></p>
                        <p className="token-id">{tokenResponse.response.token_symbol}</p>
                    </div>
                    {tokenResponse.saved_to_db && 
                    <div className='token-details-item'>
                        <p className='token-details-title'><strong>Saved to DB:</strong></p>
                        <p className="token-id">{tokenResponse.saved_to_db}</p>
                    </div>}
                    <div className='token-details-item'>
                        <label className='token-details-title-prompt' htmlFor="prompt">Prompt:</label>
                        <textarea style={{backgroundColor: '#fff'}} onChange={handlePrompt} className="token-id-prompt" name="prompt" id="prompt"></textarea>
                    </div>
                </DialogContent> :
                <DialogContent className='token-details-dialog-content'>
                    <div className='token-details-item'>
                        <p className='token-details-title'><strong>Token Name:</strong></p>
                        <p className="token-id">{tokenName}</p>
                    </div>
                    <div className='token-details-item'>
                        <label className='token-details-title-prompt' htmlFor="prompt">Prompt:</label>
                        <textarea style={{backgroundColor: '#fff'}} onChange={handlePrompt} className="token-id-prompt" name="prompt" id="prompt"></textarea>
                    </div>
                </DialogContent>
                }


                <DialogActions>
                    {loading && <CircularProgress size='1.5rem' color="secondary" /> }

                    <Button className='dialogBtn' variant="outlined" onClick={handleClose}>Close</Button>
                    <Button className='dialogBtn' variant="contained" onClick={()=> handleSubmit(targetToken, prompt)} autoFocus>
                        Search
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
