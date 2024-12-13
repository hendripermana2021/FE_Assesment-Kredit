import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import axios from 'axios';
import { serverSourceDev } from 'constant/constantaEnv';
import propTypes from 'prop-types';
import { Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// ==============================|| ADD NASABAH ||============================== //

const AddAjuan = (props) => {
  const { refreshTable } = props; // Refresh table after adding new nasabah

  // State variables for all the fields
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jlhDana, setJlhDana] = useState('');
  const [commented, setCommented] = useState('');
  const [nasabah, setNasabah] = useState('');
  const [kriteriaSelections, setKriteriaSelections] = useState([
    {
      id_kriteria: '',
      id_subKriteria: ''
    }
  ]);
  const [kriteriaList, setKriteriaList] = useState([]);
  const [nasabahList, setNasabahList] = useState([]);

  useEffect(() => {
    getKriteria();
    getNasabah();
  }, []);

  const createHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!jlhDana) {
      setLoading(false);
      return Swal.fire({
        icon: 'error',
        title: 'Please fill in all required fields',
        willOpen: () => {
          // Apply inline CSS to set z-index for SweetAlert modal
          const swalContainer = document.querySelector('.swal2-container');
          if (swalContainer) {
            swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
          }
        }
      });
    }

    const payload = {
      id_nasabah: nasabah,
      jlh_dana: jlhDana,
      commented: commented,
      document: '',
      kriteria: kriteriaList.map((kriteria, index) => ({
        id_kriteria: kriteria.id,
        id_subKriteria: kriteriaSelections[index]?.id_subKriteria
      }))
    };

    console.log('payload : ', payload);

    try {
      const response = await axios.post(`${serverSourceDev}ajuan/create`, payload, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Data Berhasil Ditambahkan',
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
          resetForm();
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error creating data',
        text: error.message,
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

  const getKriteria = async () => {
    try {
      const response = await axios.get(`${serverSourceDev}kriteria-sub`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      setKriteriaList(response.data.data);
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

  const getNasabah = async () => {
    try {
      const response = await axios.get(`${serverSourceDev}nasabah`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      setNasabahList(response.data.data);
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

  const handleKriteriaChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSelections = [...kriteriaSelections];
    updatedSelections[index] = {
      ...updatedSelections[index],
      [name]: value
    };
    setKriteriaSelections(updatedSelections);
  };

  const resetForm = () => {
    setName('');
    setJlhDana('');
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={() => setVisible(true)}>
        Add Ajuan
      </Button>
      <Dialog open={visible} maxWidth="md" fullWidth onClose={() => setVisible(false)}>
        <DialogTitle sx={{ fontSize: '20px' }}>
          Create New Ajuan
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
          <DialogContent>
            <Grid container spacing={3}>
              {/* Personal Information Section */}
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 2 }}>Ajuan Nasabah</Divider>
              </Grid>
              <Grid item xs={12} md={6} sx={{ marginBottom: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="nasabah-select-label">Nama Nasabah</InputLabel>
                  <Select
                    labelId="nasabah-select-label"
                    id="nasabah-select"
                    value={nasabah}
                    label="Nama Nasabah"
                    required
                    onChange={(e) => setNasabah(e.target.value)}
                  >
                    {nasabahList.map((value, index) => (
                      <MenuItem key={index} value={value.id}>
                        {value.name_nasabah}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Jumlah Uang"
                  variant="outlined"
                  value={jlhDana}
                  onChange={(e) => setJlhDana(e.target.value)}
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              {kriteriaList === 0
                ? ''
                : kriteriaList?.map((values, index) => (
                    <React.Fragment key={index}>
                      <Grid item xs={12} md={6} className="mb-3">
                        <TextField
                          type="text"
                          value={kriteriaSelections[index]?.id_kriteria || values.name_kriteria}
                          placeholder="Kriteria"
                          onChange={(e) => handleKriteriaChange(e, index, 'id_kriteria')}
                          readOnly={true}
                          label={`Kriteria ${index + 1}`} // Use the `label` prop instead
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                          <InputLabel id="nasabah-select-label">Sub Kriteria - {index + 1}</InputLabel>
                          <Select
                            labelId="nasabah-select-label"
                            id="nasabah-select"
                            label="Sub - Kriteria  "
                            required
                            name="id_subKriteria"
                            value={kriteriaSelections[index]?.id_subKriteria || ''}
                            onChange={(e) => handleKriteriaChange(e, index, 'id_subKriteria')}
                          >
                            {values.sub_kriteria.map((sub) => (
                              <MenuItem key={sub.id} value={sub.id}>
                                {sub.name_sub}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </React.Fragment>
                  ))}
              <Grid item xs={12} md={12}>
                {' '}
                <TextField
                  id="outlined-multiline-flexible"
                  label="Description"
                  multiline
                  fullWidth
                  maxRows={4}
                  variant="standard"
                  value={commented}
                  onChange={(e) => setCommented(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setVisible(false)} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={loading} variant="outlined">
              {loading ? <CircularProgress size={24} /> : 'Confirm'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

AddAjuan.propTypes = {
  refreshTable: propTypes.func.isRequired
};

export default AddAjuan;
