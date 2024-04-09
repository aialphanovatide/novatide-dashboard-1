import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment, IconButton } from '@mui/material';

const UsersTable = ({ updateUserTable }) => {
    const [users, setUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [userIdToUpdatePassword, setUserIdToUpdatePassword] = useState(null);
    const currentUser = useSelector(state => state.user);
    const [showPassword, setShowPassword] = useState(false);

    console.log(users)

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/get_all_users`);
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [updateUserTable]);

    const handleDeleteUser = async (userId) => {
        try {
            if (userId === currentUser.id) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'You cannot delete your own account.'
                });
                return;
            }

            await axios.delete(`${import.meta.env.VITE_API_URL}/delete_user/${userId}`);
            // Refresh the user list after deletion
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/get_all_users`);
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleChangePassword = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/users/${userIdToUpdatePassword}/change_password`, { new_password: newPassword });
            Swal.fire({
                icon: 'success',
                title: 'Password Changed',
                text: 'User password has been changed successfully.'
            });
            setUsers(users.map(user => user.id === userIdToUpdatePassword ? { ...user, password: newPassword } : user));
            setOpenDialog(false);
            setNewPassword('');
            setUserIdToUpdatePassword(null);
        } catch (error) {
            console.error('Error changing password:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to change password.'
            });
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewPassword('');
        setUserIdToUpdatePassword(null);
    };

    const handleOpenDialog = (userId) => {
        setOpenDialog(true);
        setUserIdToUpdatePassword(userId);
    };

    return (
        <div className='show-all-users'>
            <h2 className='create-user-title'>Users</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Username</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Created At</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow className='table-row' key={user.id}>
                                <TableCell sx={{ textAlign: 'center' }}>{user.username}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{user.email}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{user.role}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{user.is_active ? 'Active': 'Inactive'}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{new Date(user.created_at).toLocaleString()}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Button sx={{ margin: '5px' }} variant="outlined" color="secondary" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                                    <Button variant="outlined" color="primary" onClick={() => handleOpenDialog(user.id)}>Change Password</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Change Password Dialog */}
             <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="New Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleToggleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                    <Button onClick={handleChangePassword} color="primary">Change Password</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UsersTable;
