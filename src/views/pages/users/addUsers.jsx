import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { serverSourceDev } from 'constant/constantaEnv';
import PropTypes from 'prop-types';

// ==============================|| PAGE ROLE ||============================== //

const AddUsers = (props) => {
  const { refreshTable } = props;
  const [visible, setVisible] = useState(false); // Modal visibility state
  const [name, setName] = useState(''); // Name input state
  const [gender, setGender] = useState(''); // Gender input state
  const [email, setEmail] = useState(''); // Email input state
  const [password, setPassword] = useState(''); // Password input state
  const [loading, setLoading] = useState(false); // Loading state for the submit button
  const [confPassword, setConfPassword] = useState(''); //
  const [role, setRole] = useState(''); // Password
  const [dataRole, setDataRole] = useState([]); // Role options

  const resetForm = () => {
    setName('');
    setGender('');
    setEmail('');
    setPassword('');
    setRole('');
    setConfPassword('');
    setVisible(false);
  };

  useEffect(() => {
    getRole();
  }, []);

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

  const createHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    if (!name || !gender || !email || !password || !role) {
      setLoading(false);
      return Swal.fire({
        icon: 'error',
        title: 'Tidak boleh ada yang kosong',
        willOpen: () => {
          // Apply inline CSS to set z-index for SweetAlert modal
          const swalContainer = document.querySelector('.swal2-container');
          if (swalContainer) {
            swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
          }
        }
      }).then(() => {
        setLoading(false);
      });
    }

    if (password !== confPassword) {
      return Swal.fire({
        icon: 'error',
        title: 'Password tidak sama',
        willOpen: () => {
          // Apply inline CSS to set z-index for SweetAlert modal
          const swalContainer = document.querySelector('.swal2-container');
          if (swalContainer) {
            swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
          }
        }
      }).then(() => {
        setLoading(false);
      });
    }

    try {
      const response = await axios.post(
        `${serverSourceDev}users/register`,
        {
          name_user: name,
          gender: gender,
          email: email,
          password: password,
          role_id: role
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
          }
        }
      );

      setVisible(false);

      if (response.status === 201) {
        // Usually, 201 is returned for a successful creation
        Swal.fire({
          icon: 'success',
          title: 'Data Berhasil Ditambahkan', // Changed title for clarity
          willOpen: () => {
            // Apply inline CSS to set z-index for SweetAlert modal
            const swalContainer = document.querySelector('.swal2-container');
            if (swalContainer) {
              swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
            }
          }
        }).then(() => {
          setVisible(false);
          refreshTable();
          resetForm();
        });
      }
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error creating data',
        text: error.message,
        willOpen: () => {
          // Apply inline CSS to set z-index for SweetAlert modal
          const swalContainer = document.querySelector('.swal2-container');
          if (swalContainer) {
            swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
          }
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={() => setVisible(true)}>
        Add Users
      </Button>
      {/* Modal dialog */}
      <Dialog open={visible} maxWidth="sm" fullWidth={false} onClose={() => setVisible(false)}>
        <DialogTitle sx={{ fontSize: '1.8em' }}>
          Create New User
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
        <form onSubmit={createHandler}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth sx={{ marginBottom: '1em' }}>
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
              <Grid item xs={12} sx={{ marginBottom: '1em' }}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth sx={{ marginTop: '1em' }}>
                    <InputLabel id="gender-select-label">Role Name</InputLabel>
                    <Select
                      labelId="role-select-label"
                      id="role-select"
                      value={role}
                      label="Gender"
                      required
                      onChange={(e) => setRole(e.target.value)}
                    >
                      {dataRole.map((role, index) => (
                        <MenuItem key={index} value={role.id}>
                          {role.role_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  type="password"
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVisible(false)} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Confirm'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

AddUsers.propTypes = {
  refreshTable: PropTypes.func.isRequired // Only refreshTable is needed for creating a new role
};

export default AddUsers;
