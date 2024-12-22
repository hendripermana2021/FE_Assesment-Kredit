import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import propTypes from 'prop-types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Divider } from '@mui/material';
import { serverSourceDev } from 'constant/constantaEnv';
import axios from 'axios';
import { getDateTimeString } from 'constant/functionGlobal';

// ==============================|| ADD NASABAH ||============================== //

const DetailNasabah = (props) => {
  const { nasabah } = props; // Data to be displayed in the modal
  const [visible, setVisible] = useState(false); // Modal visibility state
  const [detailNasabah, setDetailNasabah] = useState({});
  const showDetails = () => {
    setVisible(true);
  };

  const getNasabah = useCallback(async () => {
    try {
      const response = await axios.get(`${serverSourceDev}nasabah/byid/${nasabah.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      setDetailNasabah(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      if (error.response?.status === 404) {
        swalError('Error for getting data');
      }
      console.log(error, 'Error fetching data');
    }
  }, [nasabah.id]); // Only re-create if nasabah.id changes

  // Fetch nasabah details on component mount or when nasabah.id changes
  useEffect(() => {
    if (nasabah) {
      getNasabah();
    }
  }, [getNasabah, nasabah]); // Include getNasabah in the dependencies

  console.log('detailnya bos', detailNasabah);

  return (
    <>
      <IconButton color="secondary" aria-label="delete" size="large" onClick={() => showDetails()}>
        <VisibilityIcon />
      </IconButton>
      <Dialog open={visible} maxWidth="sm" fullWidth onClose={() => setVisible(false)}>
        <DialogTitle sx={{ fontSize: '1.2em' }}>
          Detail Nasabah
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
        <form>
          <DialogContent>
            <Grid container spacing={3}>
              {/* Personal Information Section */}
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 2 }}>Personal Information</Divider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Name" variant="outlined" value={detailNasabah.name_nasabah} aria-readonly="true" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Gender" variant="outlined" value={detailNasabah.gender} aria-readonly />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Birthday"
                  variant="outlined"
                  value={getDateTimeString(detailNasabah.birthday)}
                  InputLabelProps={{ shrink: true }}
                  aria-readonly
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Marital Status" variant="outlined" value={detailNasabah.marital_status} aria-readonly />
              </Grid>

              {/* Contact Information Section */}
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 2 }}>Contact Information</Divider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth type="number" label="Phone Number" variant="outlined" value={detailNasabah.no_hp} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Place of Birth" variant="outlined" value={detailNasabah.place_of_birth} aria-readonly />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth multiline label="Address" variant="outlined" value={detailNasabah.address} required />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="NIK" type="number" variant="outlined" value={detailNasabah.nik} />
              </Grid>

              {/* Family Information Section */}
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 2 }}>Family Information</Divider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Father's Name" variant="outlined" value={detailNasabah.fathername} aria-readonly />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Mother's Name" variant="outlined" value={detailNasabah.mothername} aria-readonly />
              </Grid>

              {/* Employment Information Section */}
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 2 }}>Employment Information</Divider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Job Title" variant="outlined" value={detailNasabah.job_title} aria-readonly />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Monthly Income" variant="outlined" value={detailNasabah.monthly_income} aria-readonly />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Employment Status" variant="outlined" value={detailNasabah.employment_status} aria-readonly />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth multiline label="Work Address" variant="outlined" value={detailNasabah.work_address} aria-readonly />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Years in Job"
                  variant="outlined"
                  value={detailNasabah.long_work_at_company}
                  aria-readonly
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={() => setVisible(false)} color="secondary">
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

DetailNasabah.propTypes = {
  nasabah: propTypes.object.isRequired
};

export default DetailNasabah;
