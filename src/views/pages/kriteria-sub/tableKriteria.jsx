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
  Tooltip
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
        text: 'Maaf Data tidak ditemukan atau terjadi kesalahan'
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
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${serverSourceDev}kriteria-sub/delete/${data.id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
          });
          getKriteria(); // Reload the data after deletion
          Swal.fire('Deleted!', 'Your kriteria data has been deleted.', 'success');
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
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${serverSourceDev}sub-kriteria/delete/${sub.id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
          });
          getKriteria(); // Reload the data after deletion
          Swal.fire('Deleted!', 'Sub-Kriteria has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Sub-Kriteria cannot be deleted.', 'error');
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader title="Kriteria dan Sub-Kriteria" subheader="Ini adalah halaman untuk mengatur data Kriteria dan Sub-Kriteria" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}></Grid>
          <Grid item xs={4} sx={{ textAlign: 'right' }}>
            <AddKriteria refreshTable={getKriteria} />
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name Kriteria</TableCell>
                <TableCell align="center">Scale Priority</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Sub-Kriteria</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && kriteria.length > 0 ? (
                kriteria.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell align="center">{data.id}</TableCell>
                    <TableCell align="center">{data.name_kriteria}</TableCell>
                    <TableCell align="center">{data.scale_priority}</TableCell>
                    <TableCell align="center">{data.type}</TableCell>
                    <TableCell align="center">
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                          Sub Kriteria
                        </AccordionSummary>
                        <AccordionDetails>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Name Sub</TableCell>
                                <TableCell align="center">Value</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {data.sub_kriteria.length > 0 ? (
                                data.sub_kriteria.map((sub, index) => (
                                  <TableRow key={sub.id}>
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
                        <DetailKriteria kriteria={data} />
                        <UpdateKriteria kriteria={data} refreshTable={getKriteria} />
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