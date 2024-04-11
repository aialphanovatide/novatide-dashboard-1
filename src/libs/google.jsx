import { useEffect, useState } from 'react';
import useDrivePicker from 'react-google-drive-picker';

import Button from '@mui/material/Button';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

function UploadToDrive({ item }) {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [token, setToken] = useState(null);
    const [openPicker, data] = useDrivePicker();

    //  Opens the picker to choose if select files or upload from from computer
    const handleOpenPicker = (event) => {
        event.stopPropagation();
        openPicker({
        clientId: GOOGLE_CLIENT_ID,
        developerKey: GOOGLE_API_KEY,
        viewId: "DOCS",
        customScopes:['https://www.googleapis.com/auth/drive.file'],
        showUploadView: true,
        showUploadFolders: true,
        supportDrives: true,
        multiselect: true,
        callbackFunction: (data) => {
            if (data.action === 'cancel') {
            return;
            } else if (data.action === 'picked') {
            setSelectedFiles(data.docs);
            } 
        },
        });
    };

    // Sets the access token once the picker is open
    useEffect(() => {
        if (data && data.access_token) {
        setToken(data.access_token)
        }
    }, [data]);


  return (
    <div>
     <Button
    startIcon={<AddToDriveIcon sx={{ marginLeft: '1rem' }} />}
    sx={{fontSize: '0.8rem', margin: '1rem'}}
    variant="contained"
    onClick={(event) => handleOpenPicker(event)}
    >
    Upload to Drive from Device
    </Button>
    </div>
  );
}

export default UploadToDrive;







