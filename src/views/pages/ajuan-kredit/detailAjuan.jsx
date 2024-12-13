import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import PropTypes from 'prop-types';

// ==============================|| ADD NASABAH ||============================== //

const DetailAjuan = ({ ajuan }) => {
  const [visible, setVisible] = useState(false);
  console.log('Ajuan :', ajuan);

  const showDetails = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  const renderCpiData = () => {
    return ajuan.cpi_data?.map((values, index) => (
      <React.Fragment key={values.id}>
        <Grid item xs={12} md={6} className="mb-3">
          <TextField
            fullWidth
            label={`Kriteria ${index + 1}`}
            value={values.kriteria?.name_kriteria}
            placeholder="Kriteria"
            readOnly
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6} className="mb-3">
          <TextField
            fullWidth
            label={`Sub-Kriteria ${index + 1}`}
            value={values.subkriteria?.name_sub}
            placeholder="Sub-Kriteria"
            readOnly
            variant="outlined"
          />
        </Grid>
      </React.Fragment>
    ));
  };

  return (
    <>
      <IconButton color="secondary" aria-label="view" size="large" onClick={showDetails}>
        <Visibility />
      </IconButton>

      <Dialog open={visible} maxWidth="sm" fullWidth onClose={closeDialog}>
        <DialogTitle sx={{ fontSize: '20px' }}>
          Create New Ajuan
          <IconButton
            color="inherit"
            onClick={closeDialog}
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
                <Divider sx={{ marginBottom: 2 }}>Detail Nasabah</Divider>
              </Grid>

              {/* Nasabah Details */}
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Name Nasabah" variant="outlined" value={ajuan.nasabah?.name_nasabah} required readOnly />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Jumlah Uang"
                  variant="outlined"
                  value={ajuan.jlh_dana}
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  readOnly
                />
              </Grid>

              {/* Render CPI Data if available */}
              {ajuan.cpi_data && renderCpiData()}

              {/* Comment Section */}
              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Commented"
                  multiline
                  fullWidth
                  maxRows={4}
                  variant="standard"
                  value={ajuan.commented}
                  readOnly
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeDialog} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

DetailAjuan.propTypes = {
  ajuan: PropTypes.object.isRequired // Prop type for kriteria object
};

export default DetailAjuan;
