import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import { serverSourceDev } from 'constant/constantaEnv';

// ==============================|| UPDATE SUB Kriteria ||============================== //

const UpdateSubKriteria = (props) => {
  const { refreshTable } = props;

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameSub, setNameSub] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [kriteria, setKriteria] = useState('');
  const [dataKriteria, SetDataKriteria] = useState([]);

  useEffect(() => {
    getKriteria();
  }, []);
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverSourceDev}sub-kriteria/create`,
        {
          name_sub: nameSub,
          value: value,
          description: description,
          id_kriteria: kriteria
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
          }
        }
      );

      setVisible(false);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Sub Kriteria successfully added!',
          confirmButtonText: 'OK'
        }).then(() => {
          setVisible(false);
          refreshTable();
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to create Sub Kriteria',
        text: error.response?.data?.message || 'An unexpected error occurred'
      });
    }
  };

  const getKriteria = async () => {
    try {
      const response = await axios.get(`${serverSourceDev}kriteria`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      SetDataKriteria(response.data.data);
      setLoading(false);
      console.log(response.data.data);
      // console.log(sessionStorage.getItem('accessToken'));
    } catch (error) {
      if (error.response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Data Tidak Ada',
          text: 'Maaf Data tidak ditemukan atau belum dibuat'
        });
      }
      console.log(error, 'Error fetching data');
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setVisible(true)}>
        Add Sub Kriteria
      </Button>
      {/* Modal dialog */}
      <Dialog open={visible} maxWidth="sm" onClose={() => setVisible(false)}>
        <DialogTitle sx={{ fontSize: '20px' }}>
          Add Sub Kriteria
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
        <form onSubmit={handleCreate}>
          <Grid container spacing={2} sx={{ padding: '2em' }}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Sub Kriteria</Typography>
              <TextField
                fullWidth
                label={`Sub Kriteria`}
                value={nameSub}
                variant="outlined"
                margin="normal"
                required
                onChange={(e) => setNameSub(e.target.value)}
              />
              <TextField
                fullWidth
                label={`Value Sub-Kriteria`}
                value={value}
                type="number"
                variant="outlined"
                margin="normal"
                required
                onChange={(e) => setValue(e.target.value)}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                fullWidth
                maxRows={4}
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormControl fullWidth sx={{ marginTop: '2em' }}>
                <InputLabel id="kriteria-select-label">Kriteria</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={kriteria}
                  label="Kriteria"
                  required
                  onChange={(e) => setKriteria(e.target.value)}
                >
                  {dataKriteria.map((kriteria, index) => (
                    <MenuItem key={index} value={kriteria.id}>
                      {kriteria.name_kriteria}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Box sx={{ mt: 4, textAlign: 'end', width: '100%' }}>
              <Button variant="outlined" color="secondary" onClick={() => setVisible(false)} sx={{ mr: 2 }}>
                Close
              </Button>
              <Button type="submit" color="primary" variant="outlined" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Save Changes'}
              </Button>
            </Box>
          </Grid>
        </form>
      </Dialog>
    </>
  );
};

UpdateSubKriteria.propTypes = {
  refreshTable: PropTypes.func.isRequired // Prop type for refreshTable function
};

export default UpdateSubKriteria;
