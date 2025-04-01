import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Grid, Chip } from '@mui/material';
import { serverSourceDev } from 'constant/constantaEnv';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import $ from 'jquery';
import axios from 'axios';
import { Stack } from '@mui/system';
// import UpdateAjuan from './updateAjuan';
import DetailAjuan from './detailAjuan';

const AjuanTableHistory = () => {
  const [ajuan, setAjuan] = useState([]);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable('#tblAjuanHistory')) {
      $(document).ready(function () {
        const tableInterval = setInterval(() => {
          if ($('#tblAjuanHistory').is(':visible')) {
            clearInterval(tableInterval);
            $('#tblAjuanHistory').DataTable();
          }
        }, 1000);
      });
    }
    getAjuan();
  }, []);

  const getAjuan = async () => {
    try {
      const response = await axios.get(`${serverSourceDev}ajuan/history/finish`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      setAjuan(response.data.data);
      console.log(response.data.data);
      // console.log(sessionStorage.getItem('accessToken'));
    } catch (error) {
      console.log(error, 'Error fetching data');
    }
  };

  return (
    <Card sx={{ marginTop: '2em' }}>
      <CardHeader
        title="Page History Data Ajuan"
        subheader="Ini adalah page table untuk melihat data nasabah, yang telah dihitung dengan menggunakan metode CPI dan ROC, dan telah ditambahkan oleh petugas"
      />
      <CardContent>
        <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em' }}>
          <Grid container spacing={2}>
            {' '}
            <Grid item xs={8} md={8} sm={4}></Grid>
            <Grid item xs={4} md={4} sm={2} sx={{ textAlign: 'right' }}>
              {' '}
            </Grid>
          </Grid>
          <CardContent>
            <table className="table table-hover " id="tblAjuanHistory">
              <thead>
                <tr>
                  <th className="text-center">No.</th>
                  <th className="text-center">Name Nasabah</th>
                  <th className="text-center">Gender</th>
                  <th className="text-center">NIK</th>
                  <th className="text-center">Pengaju</th>
                  <th className="text-center">Date Add</th>
                  <th className="text-center">Generated Date</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {ajuan.length === 0
                  ? ''
                  : ajuan.map((value, index) => (
                      <tr key={index}>
                        {/* <td className="text-center">{index + 1}</td> */}
                        <td>{index + 1}</td> {/* Assuming name is 'name' */}
                        <td>{value.nasabah?.name_nasabah || ''}</td> {/* Assuming name is 'name' */}
                        <td className="text-center">{value.nasabah?.gender || ''}</td> {/* Assuming gender is 'gender' */}
                        <td>{value.nasabah?.nik || ''}</td> {/* Assuming address is 'address' */}
                        <td>{value.petugas_pengaju == null || '' ? '' : value.petugas_pengaju.name_user}</td>{' '}
                        {/* Assuming Pengaju is 'pengaju' */}
                        <td>{value.createdAt ? new Date(value.createdAt).toLocaleString() : ''}</td>
                        <td>{value.history_calculated ? new Date(value.history_calculated.createdAt).toLocaleString() : ''}</td>
                        <td>
                          {' '}
                          {value.status_ajuan == 'Diterima' ? (
                            <Chip label="Diterima" color="success" variant="outlined" />
                          ) : value.status_ajuan == 'Ditolak' ? (
                            <Chip label="Ditolak" color="error" variant="outlined" />
                          ) : (
                            <Chip label="Pending / Aktif" color="warning" variant="outlined" />
                          )}
                        </td>{' '}
                        {/* Assuming address is 'address' */}
                        <td className="text-center">
                          {value.status_ajuan == 'Aktif' ? (
                            <Stack direction="row" spacing={1}>
                              <DetailAjuan ajuan={value} />
                            </Stack>
                          ) : (
                            <Chip label="Selesai" color="primary" variant="outlined" />
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

export default AjuanTableHistory;
