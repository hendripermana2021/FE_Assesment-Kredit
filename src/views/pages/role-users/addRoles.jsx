import React, { useState } from 'react';
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
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import Swal from 'sweetalert2';
import axios from 'axios';
import { serverSourceDev } from 'constant/constantaEnv';
import propTypes from 'prop-types';

// ==============================|| PAGE ROLE ||============================== //

const AddRoles = (props) => {
  const { refreshTable } = props; // Only refreshTable since we're creating a new role
  const [visible, setVisible] = useState(false); // Modal visibility state
  const [roleName, setRoleName] = useState(''); // Role name input state
  const [loading, setLoading] = useState(false); // Loading state for the submit button

  const createHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    if (!roleName) {
      setLoading(false);
      return Swal.fire({
        icon: 'error',
        title: 'Name role tidak boleh kosong',
        willOpen: () => {
          // Apply inline CSS to set z-index for SweetAlert modal
          const swalContainer = document.querySelector('.swal2-container');
          if (swalContainer) {
            swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
          }
        }
      });
    }

    try {
      const response = await axios.post(
        `${serverSourceDev}role/create`,
        {
          // Change to the correct POST endpoint
          role_name: roleName
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
          }
        }
      );

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
          setRoleName('');
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
      <Button variant="outlined" color="secondary" onClick={() => setVisible(true)}>
        Add Role
      </Button>
      {/* Modal dialog */}
      <Dialog open={visible} maxWidth="sm" fullWidth onClose={() => setVisible(false)}>
        <DialogTitle sx={{ fontSize: '1.2em' }}>
          Create New Role
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
                <TextField
                  autoFocus
                  fullWidth
                  label="Role Name"
                  variant="outlined"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVisible(false)} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="outlined" color="primary" disabled={loading} onClick={() => setVisible(false)}>
              {loading ? <CircularProgress size={24} /> : 'Confirm'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

AddRoles.propTypes = {
  refreshTable: propTypes.func.isRequired // Only refreshTable is needed for creating a new role
};

export default AddRoles;
