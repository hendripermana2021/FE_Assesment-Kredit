import { useEffect, useState } from 'react';
import { IconButton, Card, CardHeader, CardContent, Grid, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { serverSourceDev } from 'constant/constantaEnv';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import $ from 'jquery';
import axios from 'axios';
import { Stack } from '@mui/system';
// import UpdateAjuan from './updateAjuan';
import DetailAjuan from './detailAjuan';
import AddAjuan from './addAjuan';
import UpdateAjuan from './updateAjuan';
import { swalConfirm, swalError, swalSuccess } from 'constant/functionGlobal';

const AjuanTable = () => {
  const [ajuan, setAjuan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable('#tblAjuan')) {
      $(document).ready(function () {
        const tableInterval = setInterval(() => {
          if ($('#tblAjuan').is(':visible')) {
            clearInterval(tableInterval);
            $('#tblAjuan').DataTable();
          }
        }, 1000);
      });
    }
    getAjuan();
  }, []);

  const getAjuan = async () => {
    try {
      const response = await axios.get(`${serverSourceDev}ajuan`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      setAjuan(response.data.data);
      setLoading(false);
      console.log(response.data.data);
      // console.log(sessionStorage.getItem('accessToken'));
    } catch (error) {
      console.log(error, 'Error fetching data');
      setLoading(false);
    }
  };

  const deleteHandler = async (data) => {
    swalConfirm(`Are you sure for delete this data`).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${serverSourceDev}ajuan/delete/${data.id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
          });
          getAjuan();
          swalSuccess(`Are you sure for deleting this data`);
        } catch (error) {
          console.error('Error deleting data:', error);
          swalError(`Error for deleted data`);
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader
        title="Page Data Ajuan"
        subheader="Ini adalah page table untuk melihat data nasabah, yang ingin melakukan pengajuan kredit, dan telah ditambahkan oleh petugas"
      />
      <CardContent>
        <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em' }}>
          <Grid container spacing={2}>
            {' '}
            <Grid item xs={8} md={8} sm={4}></Grid>
            <Grid item xs={4} md={4} sm={2} sx={{ textAlign: 'right' }}>
              {' '}
              <AddAjuan refreshTable={getAjuan} />
            </Grid>
          </Grid>
          <CardContent>
            <table className="table table-hover " id="tblAjuan">
              <thead>
                <tr>
                  <th className="text-center">No.</th>
                  <th className="text-center">Name Nasabah</th>
                  <th className="text-center">Gender</th>
                  <th className="text-center">NIK</th>
                  <th className="text-center">Pengaju</th>
                  <th className="text-center">Date Add</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? ''
                  : ajuan.length === 0
                    ? ''
                    : ajuan.map((value, index) => (
                        <tr key={index}>
                          {/* <td className="text-center">{index + 1}</td> */}
                          <td>{index + 1}</td> {/* Assuming name is 'name' */}
                          <td>{value.nasabah?.name_nasabah || ''}</td> {/* Assuming name is 'name' */}
                          <td className="text-center">{value.nasabah?.gender || ''}</td> {/* Assuming gender is 'gender' */}
                          <td>{value.nasabah?.nik || ''}</td> {/* Assuming address is 'address' */}
                          <td>{value.pengaju == null || '' ? '' : value.pengaju.name_user}</td> {/* Assuming Pengaju is 'pengaju' */}
                          <td>{value.createdAt ? new Date(value.createdAt).toLocaleString() : ''}</td>
                          <td>
                            {' '}
                            {value.status_ajuan == 'Diterima' ? (
                              <Chip label="Diterima" color="success" variant="contained" />
                            ) : value.status_ajuan == 'Ditolak' ? (
                              <Chip label="Ditolak" color="error" variant="contained" />
                            ) : (
                              <Chip label="Pending / Aktif" color="warning" variant="contained" />
                            )}
                          </td>{' '}
                          {/* Assuming address is 'address' */}
                          <td className="text-center">
                            {value.status_ajuan == 'Aktif' ? (
                              <Stack direction="row" spacing={1}>
                                {/* Update Button */}
                                <UpdateAjuan ajuan={value} refreshTable={getAjuan} />
                                {/* Detail Button */}
                                <DetailAjuan ajuan={value} />
                                <IconButton color="danger" aria-label="delete" size="large" onClick={() => deleteHandler(value)}>
                                  <DeleteIcon color="error" />
                                </IconButton>
                              </Stack>
                            ) : (
                              <Chip label="Selesai" color="primary" variant="contained" />
                            )}
                          </td>
                        </tr>
                      ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default AjuanTable;
