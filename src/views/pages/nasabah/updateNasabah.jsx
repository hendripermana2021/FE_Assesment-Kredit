import React, { useCallback, useEffect, useState } from 'react';
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
import { formatDate, swalError, swalSuccess } from 'constant/functionGlobal';

const UpdateNasabah = (props) => {
  const { refreshTable, nasabah } = props;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataNasabah, setDataNasabah] = useState({});
  const [formData, setFormData] = useState({
    name_nasabah: '',
    gender: '',
    maritalStatus: '',
    fatherName: '',
    motherName: '',
    phoneNumber: '',
    placeOfBirth: '',
    birthday: '',
    address: '',
    nik: '',
    jobTitle: '',
    monthlyIncome: '',
    employmentStatus: '',
    workAddress: '',
    longYearsJob: ''
  });

  const getNasabah = useCallback(async () => {
    try {
      const response = await axios.get(`${serverSourceDev}nasabah/byid/${nasabah.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      setDataNasabah(response.data.data);
    } catch (error) {
      swalError('Error fetching data');
    }
  }, [nasabah.id]);

  useEffect(() => {
    if (nasabah) {
      getNasabah();
    }
  }, [getNasabah, nasabah]);

  useEffect(() => {
    if (dataNasabah) {
      setFormData({
        name_nasabah: dataNasabah.name_nasabah || '',
        gender: dataNasabah.gender || '',
        maritalStatus: dataNasabah.marital_status || '',
        fatherName: dataNasabah.fathername || '',
        motherName: dataNasabah.mothername || '',
        phoneNumber: dataNasabah.no_hp || '',
        placeOfBirth: dataNasabah.place_of_birth || '',
        birthday: dataNasabah.birthday || '',
        address: dataNasabah.address || '',
        nik: dataNasabah.nik || '',
        jobTitle: dataNasabah.job_title || '',
        monthlyIncome: dataNasabah.monthly_income || '',
        employmentStatus: dataNasabah.employment_status || '',
        workAddress: dataNasabah.work_address || '',
        longYearsJob: dataNasabah.long_work_at_company || ''
      });
    }
  }, [dataNasabah]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = ['name_nasabah', 'gender', 'maritalStatus', 'fatherName', 'motherName', 'phoneNumber'];
    const hasEmptyFields = requiredFields.some((field) => !formData[field]);

    if (hasEmptyFields) {
      setLoading(false);
      return Swal.fire({
        icon: 'error',
        title: 'Please fill out all required fields'
      });
    }

    try {
      const response = await axios.put(
        `${serverSourceDev}nasabah/update/${nasabah.id}`,
        {
          ...formData
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
          }
        }
      );

      if (response.status === 200) {
        swalSuccess('Data successfully updated').then(() => {
          setVisible(false);
          refreshTable();
        });
      }
    } catch (error) {
      swalError('Error updating data');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log('birthday :', formatDate(formData.birthday));

  return (
    <>
      <IconButton color="info" aria-label="view" size="large" onClick={() => setVisible(true)}>
        <EditIcon />
      </IconButton>
      <Dialog open={visible} maxWidth="sm" fullWidth onClose={() => setVisible(false)}>
        <DialogTitle sx={{ fontSize: '1.2em' }}>
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
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={formData.name_nasabah}
                  onChange={(e) => handleInputChange('name_nasabah', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ marginBottom: 1 }}>
                  <InputLabel id="gender-select-label">Gender</InputLabel>
                  <Select
                    labelId="gender-select-label"
                    id="gender-select"
                    label="Gender"
                    required
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Birthday"
                  variant="outlined"
                  value={formatDate(formData.birthday)}
                  onChange={(e) => handleInputChange('birthday', e.target.value)}
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
                    label="MaritalStatus"
                    required
                    value={formData.maritalStatus}
                    onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                  >
                    <MenuItem value="Belum Menikah">Belum Menikah</MenuItem>
                    <MenuItem value="Menikah">Menikah</MenuItem>
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
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  sx={{ marginBottom: 1 }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Place of Birth"
                  variant="outlined"
                  value={formData.placeOfBirth}
                  onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
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
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
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
                  value={formData.nik}
                  onChange={(e) => handleInputChange('nik', e.target.value)}
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
                  required
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mother's Name"
                  variant="outlined"
                  required
                  value={formData.motherName}
                  onChange={(e) => handleInputChange('motherName', e.target.value)}
                />
              </Grid>

              {/* Employment Information Section */}
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 2 }}>Employment Information</Divider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  variant="outlined"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
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
                    label="Employment Status"
                    required
                    value={formData.employmentStatus}
                    onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
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
                  value={formData.workAddress}
                  onChange={(e) => handleInputChange('workAddress', e.target.value)}
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
                  required
                  value={formData.longYearsJob}
                  onChange={(e) => handleInputChange('longYearsJob', e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={() => setVisible(false)} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="outlined" color="primary" disabled={loading}>
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
