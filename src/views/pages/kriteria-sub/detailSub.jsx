import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import VisibilityIcon from '@mui/icons-material/Visibility';

// ==============================|| ADD NASABAH ||============================== //

const DetailSubKriteria = (props) => {
  const { sub } = props;
  const showDetails = () => {
    setVisible(true);
  };
  const [visible, setVisible] = useState(false);

  return (
    <>
      <IconButton color="secondary" aria-label="delete" size="large" onClick={() => showDetails()}>
        <VisibilityIcon />
      </IconButton>
      {/* Modal dialog */}
      <Dialog open={visible} maxWidth="sm" onClose={() => setVisible(false)}>
        <DialogTitle sx={{ fontSize: '1.2em' }}>
          Detail Kriteria
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
        <form>
          <Grid container spacing={2} sx={{ padding: '1em' }}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Sub Kriteria</Typography>

              <TextField fullWidth label={`Sub Kriteria `} value={sub.name_sub} aria-readonly variant="outlined" margin="normal" required />
              <TextField
                fullWidth
                label={`Value Sub-Kriteria`}
                value={sub.value}
                type="number"
                aria-readonly
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Multiline"
                multiline
                fullWidth
                maxRows={4}
                variant="standard"
                value={sub.description}
                aria-readonly
              />
              <Box sx={{ mt: 4, textAlign: 'end' }}>
                <Button variant="outlined" color="secondary" onClick={() => setVisible(false)} sx={{ mr: 2 }}>
                  Close
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </>
  );
};

DetailSubKriteria.propTypes = {
  sub: PropTypes.object.isRequired // Prop type for kriteria object
};

export default DetailSubKriteria;
