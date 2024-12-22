import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';

import VisibilityIcon from '@mui/icons-material/Visibility';

// ==============================|| ADD NASABAH ||============================== //

const DetailKriteria = (props) => {
  const { kriteria } = props;
  const showDetails = () => {
    setVisible(true);
  };

  useEffect(() => {}, [kriteria]);
  const [visible, setVisible] = useState(false);

  return (
    <React.Fragment>
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
              <Grid item xs={12} sx={{ textAlign: 'end' }}>
                {kriteria?.type ? <Chip size="large" label="Profit" color="primary" /> : <Chip label="Cost" color="error" />}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Kriteria" variant="outlined" value={kriteria.name_kriteria} aria-readonly />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth type="number" label="Prioritas" variant="outlined" value={kriteria.scale_priority} aria-readonly />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Sub Kriteria</Typography>
              {kriteria.sub_kriteria.map((sub, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <Typography>Sub Kriteria - {index + 1}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      fullWidth
                      label={`Sub Kriteria ${index + 1}`}
                      value={sub.name_sub}
                      aria-readonly
                      variant="outlined"
                      margin="normal"
                      required
                    />
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
                  </AccordionDetails>
                </Accordion>
              ))}
              <Box sx={{ mt: 4, textAlign: 'end' }}>
                <Button variant="outlined" color="secondary" onClick={() => setVisible(false)} sx={{ mr: 2 }}>
                  Close
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

DetailKriteria.propTypes = {
  kriteria: PropTypes.object.isRequired // Prop type for kriteria object
};

export default DetailKriteria;
