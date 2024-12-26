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
import PropTypes from 'prop-types';
import axios from 'axios';
import { serverSourceDev } from 'constant/constantaEnv';
import { swalError, swalSuccess } from 'constant/functionGlobal';

const AddKriteria = ({ refreshTable }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [nameKriteria, setNameKriteria] = useState('');
  const [priority, setPriority] = useState(0);
  const [type, setType] = useState(false);
  const [subKriteria, setSubKriteria] = useState([{ name_sub: '', value: 0, description: '' }]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name_kriteria: nameKriteria,
      type,
      scale_priority: priority,
      subkriteria: subKriteria.map(({ name_sub, value, description }) => ({
        name_sub,
        value,
        description
      }))
    };

    try {
      setVisible(false);
      const response = await axios.post(`${serverSourceDev}kriteria-sub/create`, payload, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });

      console.log(response);
      if (response.status === 200) {
        swalSuccess(`success create data`).then(() => {
          resetForm();
          refreshTable();
        });
      } else if (response.status === 400) {
        swalError(`Bad Request you got it`);
      }
    } catch (error) {
      swalError(`Error Create Kriteria`, error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubKriteriaChange = (index, field, value) => {
    const updatedSubKriteria = [...subKriteria];
    updatedSubKriteria[index][field] = value;
    setSubKriteria(updatedSubKriteria);
  };

  const addSubKriteria = () => {
    setSubKriteria([...subKriteria, { name_sub: '', value: 0, description: '' }]);
  };

  const resetForm = () => {
    setNameKriteria('');
    setType(false);
    setPriority(0);
    setSubKriteria([{ name_sub: '', value: 0, description: '' }]);
    setVisible(false);
  };

  return (
    <>
      <Button variant="outlined" color="secondary" onClick={() => setVisible(true)}>
        Add Kriteria
      </Button>

      <Dialog open={visible} maxWidth="sm" onClose={resetForm}>
        <DialogTitle sx={{ fontSize: '1.2em' }}>
          Create New Kriteria
          <IconButton
            color="inherit"
            onClick={resetForm}
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
        <form onSubmit={handleCreate}>
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
                      label="Value Sub-Kriteria"
                      value={sub.value}
                      type="number"
                      onChange={(e) => handleSubKriteriaChange(index, 'value', e.target.value)}
                      variant="outlined"
                      margin="normal"
                      required
                    />
                    <TextField
                      label="Description"
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
              <Button variant="outlined" color="success" onClick={addSubKriteria} sx={{ mt: 2 }}>
                Add Sub Kriteria
              </Button>

              <Box sx={{ mt: 4, textAlign: 'end' }}>
                <Button variant="outlined" color="secondary" onClick={resetForm} disabled={loading} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button variant="outlined" color="primary" type="submit" disabled={loading}>
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

AddKriteria.propTypes = {
  refreshTable: PropTypes.func.isRequired
};

export default AddKriteria;
