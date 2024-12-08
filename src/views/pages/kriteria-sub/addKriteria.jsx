import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Accordion, AccordionDetails, AccordionSummary, Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ==============================|| ADD NASABAH ||============================== //

const AddKriteria = () => {
  // State variables for all the fields
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [nameKriteria, setNameKriteria] = useState('');
  const [priority, setPriority] = useState(0);
  const [type, setType] = useState(false);
  const [subKriteria, setSubKriteria] = useState([{ name_sub: '', value: 0, description: '' }]);

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

  const handleSubKriteriaChange = (index, field, value) => {
    const updatedSubKriteria = [...subKriteria];
    updatedSubKriteria[index][field] = value;
    setSubKriteria(updatedSubKriteria);
  };

  const addSubKriteria = () => {
    setSubKriteria([...subKriteria, { name_sub: '', value: 0, description: '' }]);
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={() => setVisible(true)}>
        Add Kriteria
      </Button>
      {/* Modal dialog */}
      <Dialog open={visible} maxWidth="sm" onClose={() => setVisible(false)}>
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
          <Grid container spacing={2} sx={{ padding: '1em' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Kriteria"
                variant="outlined"
                value={nameKriteria}
                onChange={(e) => setNameKriteria(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="type-label">Type Kriteria</InputLabel>
                <Select labelId="type-label" value={type} onChange={(e) => setType(e.target.value === 'true')} label="Type Kriteria">
                  <MenuItem value="true">Profit</MenuItem>
                  <MenuItem value="false">Cost</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Prioritas"
                variant="outlined"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Sub Kriteria</Typography>
              {subKriteria.map((sub, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <Typography>Sub Kriteria - {index + 1}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      fullWidth
                      label={`Sub Kriteria ${index + 1}`}
                      value={sub.name_sub}
                      onChange={(e) => handleSubKriteriaChange(index, 'name_sub', e.target.value)}
                      variant="outlined"
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label={`Value Sub-Kriteria`}
                      value={sub.value}
                      type="number"
                      onChange={(e) => handleSubKriteriaChange(index, 'value', e.target.value)}
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
                      onChange={(e) => handleSubKriteriaChange(index, 'description', e.target.value)}
                    />
                  </AccordionDetails>
                </Accordion>
              ))}
              <Button variant="contained" color="success" onClick={addSubKriteria} sx={{ mt: 2 }}>
                Add Sub Kriteria
              </Button>
              <Box sx={{ mt: 4, textAlign: 'end' }}>
                <Button variant="outlined" color="secondary" onClick={() => setVisible(false)} disabled={loading} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={createHandler} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Confirm'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </>
  );
};

export default AddKriteria;
