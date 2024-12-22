import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import VisibilityIcon from '@mui/icons-material/Visibility';

// ==============================|| DETAIL USER ||============================== //

const DetailUsers = ({ users }) => {
  const [visible, setVisible] = useState(false); // Modal visibility state

  // State to hold user data for displaying
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showDetails = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (users) {
      setName(users.name_user || '');
      setGender(users.gender || '');
      setEmail(users.email || '');
      setPassword(users.real_password); // Don't show the password, keep it empty
    }
  }, [users]);

  return (
    <>
      {/* Button to show user details */}
      <IconButton color="secondary" aria-label="delete" size="large" onClick={() => showDetails()}>
        <VisibilityIcon />
      </IconButton>

      {/* Modal dialog */}
      <Dialog open={visible} maxWidth="sm" fullWidth={false} onClose={() => setVisible(false)}>
        <DialogTitle sx={{ fontSize: '1.2em' }}>
          User Details
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

        {/* Dialog Content */}
        <DialogContent>
          <Grid container spacing={2} sx={{ marginTop: '1em' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                InputProps={{
                  readOnly: true // Make field read-only
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Gender"
                variant="outlined"
                value={gender}
                InputProps={{
                  readOnly: true // Make field read-only
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                type="email"
                InputProps={{
                  readOnly: true // Make field read-only
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                value={password} // Display a masked password
                InputProps={{
                  readOnly: true // Make field read-only
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions>
          <Button variant="outlined" onClick={() => setVisible(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DetailUsers.propTypes = {
  users: PropTypes.object.isRequired // Expecting a user object
};

export default DetailUsers;
