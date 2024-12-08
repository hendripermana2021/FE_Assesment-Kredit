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

// ==============================|| ADD NASABAH ||============================== //

const AddKriteria = () => {
  // State variables for all the fields
  const [visible, setVisible] = useState(false); // Modal visibility state
  const [name, setName] = useState(''); // Name input state
  const [gender, setGender] = useState(''); // Gender input state
  const [email, setEmail] = useState(''); // Email input state
  const [maritalStatus, setMaritalStatus] = useState(''); // Marital Status input state
  const [fatherName, setFatherName] = useState(''); // Father Name input state
  const [motherName, setMotherName] = useState(''); // Mother Name input state
  const [phoneNumber, setPhoneNumber] = useState(''); // Phone Number input state
  const [birthday, setBirthday] = useState(''); // Birthday input state
  const [placeOfBirth, setPlaceOfBirth] = useState(''); // Place of Birth input state
  const [address, setAddress] = useState(''); // Address input state
  const [nik, setNik] = useState(''); // NIK input state
  const [jobTitle, setJobTitle] = useState(''); // Job Title input state
  const [monthlyIncome, setMonthlyIncome] = useState(''); // Monthly Income input state
  const [employmentStatus, setEmploymentStatus] = useState(''); // Employment Status input state
  const [workAddress, setWorkAddress] = useState(''); // Work Address input state
  const [longYearsJob, setLongYearsJob] = useState(''); // Long Years Job input state
  const [loading, setLoading] = useState(false); // Loading state for the submit button

  // Handle form submission
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
        Add Nasabah
      </Button>
      {/* Modal dialog */}
      <Dialog open={visible} maxWidth="sm" fullWidth onClose={() => setVisible(false)}>
        <DialogTitle sx={{ fontSize: '20px' }}>
          Create New Nasabah
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
            <Grid container spacing={3}>
              {/* Left Column */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Gender"
                  variant="outlined"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Marital Status"
                  variant="outlined"
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Father's Name"
                  variant="outlined"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Mother's Name"
                  variant="outlined"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
                />
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Birthday"
                  variant="outlined"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  type="date"
                  required
                  InputLabelProps={{
                    shrink: true
                  }}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Place of Birth"
                  variant="outlined"
                  value={placeOfBirth}
                  onChange={(e) => setPlaceOfBirth(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="NIK"
                  variant="outlined"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Job Title"
                  variant="outlined"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
                />
              </Grid>

              {/* Additional fields */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Monthly Income"
                  variant="outlined"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Employment Status"
                  variant="outlined"
                  value={employmentStatus}
                  onChange={(e) => setEmploymentStatus(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Work Address"
                  variant="outlined"
                  value={workAddress}
                  onChange={(e) => setWorkAddress(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Years in Job"
                  variant="outlined"
                  value={longYearsJob}
                  onChange={(e) => setLongYearsJob(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
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

export default AddKriteria;
