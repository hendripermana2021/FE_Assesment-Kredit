import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import propTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import { serverSourceDev } from 'constant/constantaEnv';

// ==============================|| PAGE ROLE ||============================== //

const UpdateRoles = (props) => {
  const { refreshTable, role } = props; // Only refreshTable since we're creating a new role
  const [visible, setVisible] = useState(false); // Modal visibility state
  const [roleName, setRoleName] = useState(role.role_name);
  const [loading, setLoading] = useState(false);

  // This handler is called to open the modal with role details
  const showDetails = () => {
    setVisible(true);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    if (!roleName) {
      setLoading(false);
      return Swal.fire({ icon: 'error', title: 'Name role tidak boleh kosong' });
    }

    try {
      const response = await axios.put(
        `${serverSourceDev}role/update/${role.id}`,
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

      if (response.status === 200) {
        // Usually, 201 is returned for a successful creation
        Swal.fire({
          icon: 'success',
          title: 'Data Success Updated' // Changed title for clarity
        }).then(() => {
          setVisible(false);
          refreshTable();
        });
      }
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error creating data',
        text: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton color="info" aria-label="delete" size="large" onClick={() => showDetails()}>
        <EditIcon />
      </IconButton>
      {/* Modal dialog to show role details */}
      <Dialog open={visible} maxWidth="sm" fullWidth={false} onClose={() => setVisible(false)}>
        <form onSubmit={updateHandler}>
          <DialogTitle>
            Role Details
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
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* Displaying role details (Read-only) */}
                <TextField
                  fullWidth
                  label="Role Name"
                  variant="outlined"
                  sx={{ mt: 1 }}
                  value={roleName || ''}
                  onChange={(e) => setRoleName(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" type="submit" onClick={() => setVisible(false)}>
              {loading ? 'Saving...' : 'Save changes'}
            </Button>
            <Button onClick={() => setVisible(false)} color="secondary">
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

UpdateRoles.propTypes = {
  refreshTable: propTypes.func.isRequired, // Only refreshTable is needed for creating a new role
  role: propTypes.object.isRequired // Corrected prop name to 'programs'
};

export default UpdateRoles;
