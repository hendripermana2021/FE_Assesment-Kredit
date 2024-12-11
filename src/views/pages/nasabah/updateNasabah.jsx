import React, { useState } from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import axios from 'axios';
import propTypes from 'prop-types';
import { serverSourceDev } from 'constant/constantaEnv';

const UpdateNasabah = (props) => {
  const { refreshTable, nasabah } = props;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(nasabah.name_nasabah);
  const [gender, setGender] = useState(nasabah.gender);
  const [maritalStatus, setMaritalStatus] = useState(nasabah.marital_status);
  const [fatherName, setFatherName] = useState(nasabah.fathername);
  const [motherName, setMotherName] = useState(nasabah.mothername);
  const [phoneNumber, setPhoneNumber] = useState(nasabah.no_hp);
  const [placeOfBirth, setPlaceOfBirth] = useState(nasabah.place_of_birth);
  const [birthday, setBirthday] = useState(nasabah.birthday);
  const [address, setAddress] = useState(nasabah.address);
  const [nik, setNik] = useState(nasabah.nik);
  const [jobTitle, setJobTitle] = useState(nasabah.job_title);
  const [monthlyIncome, setMonthlyIncome] = useState(nasabah.monthly_income);
  const [employmentStatus, setEmploymentStatus] = useState(nasabah.employment_status);
  const [workAddress, setWorkAddress] = useState(nasabah.work_address);
  const [longYearsJob, setLongYearsJob] = useState(nasabah.long_work_at_company);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name | !gender | !maritalStatus || !fatherName || !motherName || !phoneNumber) {
      return Swal.fire({
        icon: 'error',
        title: 'Please fill dont empty cause it, required fields'
      });
    }
    setVisible(false);
    try {
      const response = await axios.put(
        `${serverSourceDev}nasabah/update/${nasabah.id}`,
        {
          name_nasabah: name,
          gender: gender,
          marital_status: maritalStatus,
          fathername: fatherName,
          mothername: motherName,
          no_hp: phoneNumber,
          place_of_birth: placeOfBirth,
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

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Data Updated Successfully'
        }).then(() => {
          setVisible(false);
          refreshTable();
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error Updating Data',
        text: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton color="secondary" aria-label="view" size="large" onClick={() => setVisible(true)}>
        <EditIcon />
      </IconButton>
      <Dialog open={visible} maxWidth="sm" fullWidth onClose={() => setVisible(false)}>
        <DialogTitle>
          Update Nasabah
          <IconButton
            color="inherit"
            onClick={() => setVisible(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
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
                    value={gender} // This ensures it defaults to nasabah.gender if gender is not set
                    label="Gender"
                    required
                    onChange={(e) => setGender(e.target.value)} // Update state when user selects a gender
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
                  value={new Date(birthday).toISOString().split('T')[0]}
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
                    <MenuItem value="Sudah Menikah">Menikah</MenuItem>
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
                    value={monthlyIncome}
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
            <Button onClick={() => setVisible(false)} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Save Changes'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

UpdateNasabah.propTypes = {
  nasabah: propTypes.object.isRequired,
  refreshTable: propTypes.func.isRequired
};

export default UpdateNasabah;
