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
import Swal from 'sweetalert2';
import axios from 'axios';
import { serverSourceDev } from 'constant/constantaEnv';
import propTypes from 'prop-types';
import { Divider, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { swalConfirm, swalError } from 'constant/functionGlobal';

// ==============================|| ADD NASABAH ||============================== //

const AddNasabah = (props) => {
  const { refreshTable } = props; // Refresh table after adding new nasabah

  // State variables for all the fields
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [nik, setNik] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [workAddress, setWorkAddress] = useState('');
  const [longYearsJob, setLongYearsJob] = useState('');
  const [loading, setLoading] = useState(false);

  const createHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !nik || !address) {
      setLoading(false);
      return Swal.fire({ icon: 'error', title: 'Please fill in all required fields' });
    }
    setVisible(false);

    try {
      const response = await axios.post(
        `${serverSourceDev}nasabah/register`,
        {
          name_nasabah: name,
          gender: gender,
          fathername: fatherName,
          mothername: motherName,
          marital_status: maritalStatus,
          no_hp: phoneNumber,
          place_of_birth: placeOfBirth,
          birthday: birthday,
          address: address,
          nik: nik,
          job_title: jobTitle,
          monthly_income: monthlyIncome,
          employment_status: employmentStatus,
          work_address: workAddress,
          long_work_at_company: longYearsJob
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
          }
        }
      );

      if (response.status === 201) {
        swalConfirm('Success for create data').then(() => {
          setVisible(false);
          refreshTable();
          resetForm();
        });
      }
    } catch (error) {
      swalError('Error for create this data');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setGender('');
    setMaritalStatus('');
    setFatherName('');
    setMotherName('');
    setPhoneNumber('');
    setBirthday('');
    setPlaceOfBirth('');
    setAddress('');
    setNik('');
    setJobTitle('');
    setMonthlyIncome('');
    setEmploymentStatus('');
    setWorkAddress('');
    setLongYearsJob('');
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={() => setVisible(true)}>
        Add Nasabah
      </Button>
      <Dialog open={visible} maxWidth="sm" fullWidth onClose={() => setVisible(false)}>
        <DialogTitle sx={{ fontSize: '20px' }}>
          Create New Nasabah
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
              {/* Personal Information Section */}
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 2 }}>Personal Information</Divider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />
              </Grid>
              <Grid item xs={12} md={6}>
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
                    <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                    <MenuItem value="Perempuan">Perempuan</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Birthday"
                  variant="outlined"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                  <InputLabel id="gender-select-label">Marital Status</InputLabel>
                  <Select
                    labelId="gender-select-label"
                    id="gender-select"
                    value={maritalStatus}
                    label="Marital Status"
                    required
                    onChange={(e) => setMaritalStatus(e.target.value)}
                  >
                    <MenuItem value="Belum Menikah">Belum Menikah</MenuItem>
                    <MenuItem value="Sudah Menikah">Sudah Menikah</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Contact Information Section */}
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 2 }}>Contact Information</Divider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Phone Number"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  sx={{ marginBottom: 1 }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Place of Birth"
                  variant="outlined"
                  value={placeOfBirth}
                  onChange={(e) => setPlaceOfBirth(e.target.value)}
                  sx={{ marginBottom: 1 }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  multiline
                  label="Address"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  sx={{
                    marginBottom: 1,
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      resize: 'vertical', // Enable manual resizing
                      overflow: 'auto'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="NIK"
                  type="number"
                  variant="outlined"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  required
                  sx={{ marginBottom: 1 }}
                />
              </Grid>

              {/* Family Information Section */}
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 2 }}>Family Information</Divider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Father's Name"
                  variant="outlined"
                  value={fatherName}
                  required
                  onChange={(e) => setFatherName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mother's Name"
                  variant="outlined"
                  value={motherName}
                  required
                  onChange={(e) => setMotherName(e.target.value)}
                />
              </Grid>

              {/* Employment Information Section */}
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 2 }}>Employment Information</Divider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Job Title" variant="outlined" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    type="number"
                    id="outlined-adornment-weight"
                    required
                    endAdornment={<InputAdornment position="end">/ Month</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight'
                    }}
                  />
                  <FormHelperText id="outlined-weight-helper-text">Salary</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                  <InputLabel id="gender-select-label">Employment Status</InputLabel>
                  <Select
                    labelId="employment-select-label"
                    id="employment-select"
                    value={employmentStatus}
                    label="Employment Status"
                    required
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                  >
                    <MenuItem value="Bekerja">Bekerja</MenuItem>
                    <MenuItem value="Tidak Bekerja">Tidak Bekerja</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  multiline
                  label="Work Address"
                  variant="outlined"
                  value={workAddress}
                  onChange={(e) => setWorkAddress(e.target.value)}
                  required
                  sx={{
                    marginBottom: 1,
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      resize: 'vertical', // Enable manual resizing
                      overflow: 'auto'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Years in Job"
                  variant="outlined"
                  value={longYearsJob}
                  required
                  onChange={(e) => setLongYearsJob(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setVisible(false)} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="outlined" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Confirm'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

AddNasabah.propTypes = {
  refreshTable: propTypes.func.isRequired
};

export default AddNasabah;
