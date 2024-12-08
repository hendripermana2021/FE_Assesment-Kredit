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

// ==============================|| PAGE ROLE ||============================== //

const AddUsers = () => {
  const [visible, setVisible] = useState(false); // Modal visibility state
  const [name, setName] = useState(''); // Name input state
  const [gender, setGender] = useState(''); // Gender input state
  const [email, setEmail] = useState(''); // Email input state
  const [password, setPassword] = useState(''); // Password input state
  const [loading, setLoading] = useState(false); // Loading state for the submit button

  const createHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate an async call (e.g., API request)
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 2000); // Simulating a 2-second delay
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={() => setVisible(true)}>
        Add Users
      </Button>
      {/* Modal dialog */}
      <Dialog open={visible} maxWidth="sm" fullWidth={false} onClose={() => setVisible(false)}>
        <DialogTitle>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Gender"
                  variant="outlined"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </Grid>
              <Grid item xs={12}>
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

export default AddUsers;
