import { useEffect, useState } from 'react';
import {
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { serverSourceDev } from 'constant/constantaEnv';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddKriteria from './addKriteria';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconEye } from '@tabler/icons-react';
import { Stack } from '@mui/system';
import DetailKriteria from './detailKriteria';
import UpdateKriteria from './updateKriteria';
import DetailSubKriteria from './detailSub';
import UpdateSubKriteria from './updateSubKriteria';
import AddSubKriteria from './addSubKriteria';

const KriteriaTable = () => {
  const [kriteria, setKriteria] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getKriteria();
  }, []);

  const getKriteria = async () => {
    try {
      const response = await axios.get(`${serverSourceDev}kriteria-sub`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      setKriteria(response.data.data);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.response?.status === 404 ? 'Data Tidak Ada' : 'Error',
        text: 'Maaf Data tidak ditemukan atau terjadi kesalahan',
        willOpen: () => {
          // Apply inline CSS to set z-index for SweetAlert modal
          const swalContainer = document.querySelector('.swal2-container');
          if (swalContainer) {
            swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
          }
        }
      });
      setLoading(false);
    }
  };

  const deleteHandler = async (data) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      willOpen: () => {
        // Apply inline CSS to set z-index for SweetAlert modal
        const swalContainer = document.querySelector('.swal2-container');
        if (swalContainer) {
          swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${serverSourceDev}kriteria-sub/delete/${data.id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
          });
          getKriteria(); // Reload the data after deletion
          Swal.fire({
            title: 'Success Deleted?',
            text: 'Success for delete this data.',
            icon: 'success',
            willOpen: () => {
              // Apply inline CSS to set z-index for SweetAlert modal
              const swalContainer = document.querySelector('.swal2-container');
              if (swalContainer) {
                swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
              }
            }
          });
        } catch (error) {
          Swal.fire('Error!', 'Your kriteria data cannot be deleted.', 'error');
        }
      }
    });
  };

  const deleteSub = async (sub) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      willOpen: () => {
        // Apply inline CSS to set z-index for SweetAlert modal
        const swalContainer = document.querySelector('.swal2-container');
        if (swalContainer) {
          swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${serverSourceDev}sub-kriteria/delete/${sub.id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
          });
          getKriteria(); // Reload the data after deletion
          Swal.fire({
            title: 'Success Deleted?',
            text: 'Success for delete this data.',
            icon: 'success',
            willOpen: () => {
              // Apply inline CSS to set z-index for SweetAlert modal
              const swalContainer = document.querySelector('.swal2-container');
              if (swalContainer) {
                swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
              }
            }
          });
        } catch (error) {
          Swal.fire({
            title: 'Error while',
            text: 'Error delete kriteira.',
            icon: 'error',
            willOpen: () => {
              // Apply inline CSS to set z-index for SweetAlert modal
              const swalContainer = document.querySelector('.swal2-container');
              if (swalContainer) {
                swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
              }
            }
          });
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader title="Page Kriteria dan Sub-Kriteria" subheader="Ini adalah halaman untuk mengatur data Kriteria dan Sub-Kriteria" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={9}></Grid>
          <Grid item xs={3} sx={{ textAlign: 'end', width: '100%' }}>
            <Stack direction="row" spacing={1}>
              <AddKriteria refreshTable={getKriteria} />
              <AddSubKriteria refreshTable={getKriteria} />
            </Stack>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">No.</TableCell>
                <TableCell align="center">Name Kriteria</TableCell>
                <TableCell align="center">Scale Priority</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Sub-Kriteria</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && kriteria.length > 0 ? (
                kriteria.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{data.name_kriteria}</TableCell>
                    <TableCell align="center">{data.scale_priority}</TableCell>
                    <TableCell align="center">
                      {data?.type ? <Chip size="large" label="Profit" color="primary" /> : <Chip label="Cost" color="error" />}
                    </TableCell>
                    <TableCell align="center">
                      <Accordion square>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                          Sub Kriteria
                        </AccordionSummary>
                        <AccordionDetails>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">No.</TableCell>
                                <TableCell align="center">Name Sub</TableCell>
                                <TableCell align="center">Value</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {data.sub_kriteria.length > 0 ? (
                                data.sub_kriteria.map((sub, index) => (
                                  <TableRow key={index}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{sub.name_sub}</TableCell>
                                    <TableCell align="center">{sub.value}</TableCell>
                                    <TableCell align="center">
                                      <Tooltip title={sub.description}>
                                        <IconButton>
                                          <IconEye />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>
                                    <TableCell align="center">
                                      <Stack direction="row" spacing={1}>
                                        <UpdateSubKriteria sub={sub} refreshTable={getKriteria} />
                                        <DetailSubKriteria sub={sub} />
                                        <IconButton color="error" onClick={() => deleteSub(sub)}>
                                          <DeleteIcon />
                                        </IconButton>
                                      </Stack>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={4} align="center">
                                    No Sub-Kriteria available
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1}>
                        <UpdateKriteria kriteria={data} refreshTable={getKriteria} />
                        <DetailKriteria kriteria={data} />
                        <IconButton color="error" onClick={() => deleteHandler(data)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {loading ? 'Loading...' : 'No data available'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default KriteriaTable;
