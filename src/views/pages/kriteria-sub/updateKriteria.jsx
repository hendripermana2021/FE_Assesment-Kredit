import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { serverSourceDev } from 'constant/constantaEnv';

// ==============================|| UPDATE Kriteria ||============================== //

const UpdateKriteria = (props) => {
  const { kriteria, refreshTable } = props;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [nameKriteria, setNameKriteria] = useState(kriteria.name_kriteria);
  const [priority, setPriority] = useState(kriteria.scale_priority);
  const [type, setType] = useState(kriteria.type);
  const [subKriteria, setSubKriteria] = useState(
    kriteria?.sub_kriteria.map((sub) => ({
      id: sub.id,
      name_sub: sub.name_sub,
      value: sub.value,
      description: sub.description || ''
    }))
  );

  const showDetails = () => {
    setVisible(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${serverSourceDev}kriteria-sub/update/${kriteria.id}`,
        {
          name_kriteria: nameKriteria,
          scale_priority: priority,
          type: type,
          subkriteria: subKriteria.map((sub) => ({
            name_sub: sub.name_sub,
            value: sub.value,
            description: sub.description // Include description in the request
          }))
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
          }
        }
      );

      setVisible(false);

      console.log('Response', response);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Data successfully updated!',
          confirmButtonText: 'OK',
          willOpen: () => {
            // Apply inline CSS to set z-index for SweetAlert modal
            const swalContainer = document.querySelector('.swal2-container');
            if (swalContainer) {
              swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
            }
          }
        }).then(() => {
          setVisible(false);
          refreshTable();
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to update data',
        text: error.response?.data?.message || 'An unexpected error occurred',
        willOpen: () => {
          // Apply inline CSS to set z-index for SweetAlert modal
          const swalContainer = document.querySelector('.swal2-container');
          if (swalContainer) {
            swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
          }
        }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (kriteria?.sub_kriteria) {
      setSubKriteria(
        kriteria.sub_kriteria.map((sub) => ({
          id: sub.id,
          name_sub: sub.name_sub,
          description: sub.description || '',
          value: sub.value || 0
        }))
      );
    }
  }, [kriteria]);

  const handleSubKriteriaChange = (index, field, value) => {
    const updatedSubKriteria = [...subKriteria];
    updatedSubKriteria[index][field] = value;
    setSubKriteria(updatedSubKriteria);
  };

  return (
    <>
      <IconButton color="info" aria-label="edit" size="large" onClick={() => showDetails()}>
        <EditIcon />
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
        <form onSubmit={handleUpdate}>
          <Grid container spacing={2} sx={{ padding: '1em' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Kriteria"
                variant="outlined"
                value={nameKriteria}
                onChange={(e) => setNameKriteria(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Prioritas"
                variant="outlined"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ marginBottom: 1 }}>
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={type}
                  label="Type"
                  required
                  onChange={(e) => setType(e.target.value)} // Update state when user selects a type
                >
                  <MenuItem value={true}>Benefit</MenuItem>
                  <MenuItem value={false}>Cost</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Sub Kriteria</Typography>
              {subKriteria.map((sub, index) => (
                <Accordion key={sub.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                    <Typography>Sub Kriteria - {index + 1}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      fullWidth
                      label={`Sub Kriteria ${index + 1}`}
                      value={sub.name_sub}
                      variant="outlined"
                      margin="normal"
                      onChange={(e) => handleSubKriteriaChange(index, 'name_sub', e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      label={`Value Sub-Kriteria`}
                      value={sub.value}
                      type="number"
                      variant="outlined"
                      margin="normal"
                      onChange={(e) => handleSubKriteriaChange(index, 'value', e.target.value)}
                      required
                    />
                    <TextField
                      id="outlined-multiline-flexible"
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
              <Box sx={{ mt: 4, textAlign: 'end' }}>
                <Button variant="outlined" color="secondary" onClick={() => setVisible(false)} sx={{ mr: 2 }}>
                  Close
                </Button>
                <Button type="submit" color="primary" variant="outlined" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </>
  );
};

UpdateKriteria.propTypes = {
  kriteria: PropTypes.object.isRequired, // Prop type for kriteria object
  refreshTable: PropTypes.func.isRequired
};

export default UpdateKriteria;
