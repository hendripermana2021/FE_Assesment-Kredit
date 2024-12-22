import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { serverSourceDev } from 'constant/constantaEnv';
import PropTypes from 'prop-types';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { swalError } from 'constant/functionGlobal';

// ==============================|| UPDATE USERS ||============================== //

const UpdateUsers = (props) => {
  const { users, refreshTable } = props;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(''); // User name input state
  const [gender, setGender] = useState(''); // Gender input state
  const [email, setEmail] = useState(''); // Email input state
  const [password, setPassword] = useState(''); // Password input state
  const [confPassword, setConfPassword] = useState(''); // Confirm Password input state
  const [role, setRole] = useState(''); // Role select state
  const [dataRole, setDataRole] = useState([]); // Role options

  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle
  const [showConfPassword, setShowConfPassword] = useState(false); // For confirm password visibility toggle

  useEffect(() => {
    if (users) {
      setName(users.name_user || '');
      setGender(users.gender || '');
      setEmail(users.email || '');
      setRole(users.role_id); // Set the role id as the selected role
      setPassword(users.real_password); // Don't show the password, keep it empty
      setConfPassword(users.real_password); // Don't show the password, keep it empty
      setEmail(users.email || '');
    }
    getRole();
  }, [users]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfPassword = () => setShowConfPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const showDetails = () => {
    setVisible(true);
  };

  const resetForm = () => {
    setPassword('');
    setConfPassword('');
    setVisible(false);
  };

  const handleClose = () => {
    resetForm();
    setVisible(false);
  };

  const getRole = async () => {
    try {
      const response = await axios.get(`${serverSourceDev}role`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      setDataRole(response.data.data);
      setLoading(false);
      console.log(response.data.data);
      // console.log(sessionStorage.getItem('accessToken'));
    } catch (error) {
      if (error.response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Data Tidak Ada',
          text: 'Maaf Data tidak ditemukan atau belum dibuat',
          willOpen: () => {
            // Apply inline CSS to set z-index for SweetAlert modal
            const swalContainer = document.querySelector('.swal2-container');
            if (swalContainer) {
              swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
            }
          }
        });
      }
      console.log(error, 'Error fetching data');
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== '') {
      if (password !== confPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Passwords do not match',
          text: 'Please ensure the passwords match',
          willOpen: () => {
            // Apply inline CSS to set z-index for SweetAlert modal
            const swalContainer = document.querySelector('.swal2-container');
            if (swalContainer) {
              swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
            }
          }
        });
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.put(
        `${serverSourceDev}users/update/${users.id}`, // Update the correct API endpoint
        {
          name_user: name,
          gender,
          email,
          role_id: role,
          password: password // Only include password if it's provided
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
          }
        }
      );

      setVisible(false);

      console.log('Response', response);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'User successfully updated!',
          confirmButtonText: 'OK',
          willOpen: () => {
            // Apply inline CSS to set z-index for SweetAlert modal
            const swalContainer = document.querySelector('.swal2-container');
            if (swalContainer) {
              swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
            }
          }
        }).then(() => {
          setVisible(false);
          refreshTable(); // Refresh table data
          resetForm();
        });
      }
    } catch (error) {
      setVisible(false);
      swalError(`Data Gagal di update`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton color="info" aria-label="edit" size="large" onClick={showDetails}>
        <EditIcon />
      </IconButton>
      {/* Modal dialog */}
      <Dialog open={visible} maxWidth="sm" onClose={() => setVisible(false)} sx={{ padding: '3em' }}>
        <DialogTitle sx={{ fontSize: '1.2em' }}>
          Edit User Details
          {/* Close Icon */}
          <IconButton
            color="inherit"
            onClick={() => setVisible(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleUpdate}>
          <Grid container spacing={2} sx={{ padding: '1em' }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth sx={{ marginBottom: 1 }}>
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  labelId="gender-select-label"
                  id="gender-select"
                  value={gender}
                  label="Gender"
                  required
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth sx={{ marginBottom: 1 }}>
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={role}
                  label="Role"
                  required
                  onChange={(e) => setRole(e.target.value)}
                >
                  {dataRole.map((data, index) => {
                    return (
                      <MenuItem key={index} value={data.id}>
                        {data.role_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            {/* Password input */}
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            {/* Confirm Password input */}
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-conf-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-conf-password"
                  type={showConfPassword ? 'text' : 'password'}
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showConfPassword ? 'hide the confirm password' : 'display the confirm password'}
                        onClick={handleClickShowConfPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showConfPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
            </Grid>

            <Box sx={{ textAlign: 'end !important', padding: '1em', width: '100%' }}>
              <Button variant="outlined" color="secondary" onClick={() => handleClose()} sx={{ mr: 2 }}>
                Close
              </Button>
              <Button type="submit" color="primary" variant="outlined" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Save Changes'}
              </Button>
            </Box>
          </Grid>
        </form>
      </Dialog>
    </>
  );
};

UpdateUsers.propTypes = {
  users: PropTypes.object.isRequired, // Prop type for user object
  refreshTable: PropTypes.func.isRequired
};

export default UpdateUsers;
