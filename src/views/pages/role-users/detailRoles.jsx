import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import propTypes from 'prop-types';
import axios from 'axios';
import { serverSourceDev } from 'constant/constantaEnv';
import { swalError } from 'constant/functionGlobal';

// ==============================|| PAGE ROLE ||============================== //

const DetailRoles = (props) => {
  const { role } = props;
  const [visible, setVisible] = useState(false); // Modal visibility state
  const [roleDetail, setRoleDetail] = useState({});

  // This handler is called to open the modal with role details
  const showDetails = () => {
    setVisible(true);
  };
  const getRoles = useCallback(async () => {
    try {
      const response = await axios.get(`${serverSourceDev}role/byid/${role.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      setRoleDetail(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      if (error.response?.status === 404) {
        swalError('Error for getting data');
      }
      console.log(error, 'Error fetching data');
    }
  }, [role.id]); // Only re-create if nasabah.id changes

  // Fetch nasabah details on component mount or when nasabah.id changes
  useEffect(() => {
    if (role) {
      getRoles();
    }
  }, [getRoles, role]); // Include getNasabah in the dependencies

  console.log('roleDetails', roleDetail);
  return (
    <>
      <IconButton color="secondary" aria-label="delete" size="large" onClick={() => showDetails()}>
        <VisibilityIcon />
      </IconButton>
      {/* Modal dialog to show role details */}
      <Dialog open={visible} maxWidth="sm" fullWidth onClose={() => setVisible(false)}>
        <DialogTitle sx={{ fontSize: '1.2em' }}>
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
              <TextField fullWidth label="Role Name" variant="outlined" sx={{ mt: 1 }} value={roleDetail?.role_name || ''} readOnly />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setVisible(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DetailRoles.propTypes = {
  role: propTypes.object.isRequired // Corrected prop name to 'programs'
};

export default DetailRoles;
