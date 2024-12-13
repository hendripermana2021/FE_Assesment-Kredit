import React, { useState } from 'react';
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

// ==============================|| PAGE ROLE ||============================== //

const DetailRoles = ({ role }) => {
  const [visible, setVisible] = useState(false); // Modal visibility state

  // This handler is called to open the modal with role details
  const showDetails = () => {
    setVisible(true);
  };

  return (
    <>
      <IconButton color="secondary" aria-label="delete" size="large" onClick={() => showDetails()}>
        <VisibilityIcon />
      </IconButton>
      {/* Modal dialog to show role details */}
      <Dialog open={visible} maxWidth="sm" fullWidth={false} onClose={() => setVisible(false)}>
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
              <TextField fullWidth label="Role Name" variant="outlined" sx={{ mt: 1 }} value={role.role_name || ''} disabled />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVisible(false)} color="secondary">
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
