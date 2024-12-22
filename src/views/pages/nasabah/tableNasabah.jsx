import React, { useEffect, useState } from 'react';
import { IconButton, Card, CardHeader, CardContent, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { serverSourceDev } from 'constant/constantaEnv';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import $ from 'jquery';
import axios from 'axios';
import { Stack } from '@mui/system';
import AddNasabah from './addNasabah';
import DetailNasabah from './detailNasabah';
import UpdateNasabah from './updateNasabah';
import { swalConfirm, swalError, swalSuccess } from 'constant/functionGlobal';

const NasabahTable = () => {
  const [nasabah, setNasabah] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable('#tblNasabah')) {
      $(document).ready(function () {
        const tableInterval = setInterval(() => {
          if ($('#tblNasabah').is(':visible')) {
            clearInterval(tableInterval);
            $('#tblNasabah').DataTable();
          }
        }, 1000);
      });
    }
    getNasabah();
  }, []);

  const getNasabah = async () => {
    try {
      const response = await axios.get(`${serverSourceDev}nasabah`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      setNasabah(response.data.data);
      setLoading(false);
      console.log(response.data.data);
      // console.log(sessionStorage.getItem('accessToken'));
    } catch (error) {
      if (error.response.status === 404) {
        swalError('Error for getting data');
      }
      console.log(error, 'Error fetching data');
      setLoading(false);
    }
  };

  const deleteHandler = async (data) => {
    swalConfirm('Are you sure, for deleting this data?').then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${serverSourceDev}nasabah/delete/${data.id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
          });
          getNasabah();
          swalSuccess(`Success deleted data.`);
        } catch (error) {
          console.error('Error deleting data:', error);
          swalError('Error deleting data');
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader
        title="Page Data Nasabah"
        subheader="Ini adalah page table untuk melakukan pengaturan atau CRUD pada data nasabah, yang telah ditambahkan oleh petugas"
      />
      <CardContent>
        <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em' }}>
          <Grid container spacing={2}>
            {' '}
            <Grid item xs={8} md={8} sm={4}></Grid>
            <Grid item xs={4} md={4} sm={2} sx={{ textAlign: 'right' }}>
              {' '}
              <AddNasabah refreshTable={getNasabah} />
            </Grid>
          </Grid>
          <CardContent>
            <table className="table table-hover " id="tblNasabah">
              <thead>
                <tr>
                  <th className="text-center">No.</th>
                  <th className="text-center">Name Nasabah</th>
                  <th className="text-center">Gender</th>
                  <th className="text-center">Address</th>
                  <th className="text-center">NIK</th>
                  <th className="text-center">Pengaju</th>
                  <th className="text-center">Date Add</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? ''
                  : nasabah.length === 0
                    ? ''
                    : nasabah.map((value, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            {/* <td className="text-center">{index + 1}</td> */}
                            <td>{value.id}</td> {/* Assuming name is 'name' */}
                            <td>{value.name_nasabah}</td> {/* Assuming name is 'name' */}
                            <td className="text-center">{value.gender}</td> {/* Assuming gender is 'gender' */}
                            <td>{value.address || ' '}</td> {/* Assuming address is 'address' */}
                            <td>{value.nik || ''}</td> {/* Assuming NIK is 'nik' */}
                            <td>{value.pengaju == null || '' ? '' : value.pengaju.name_user}</td> {/* Assuming Pengaju is 'pengaju' */}
                            <td>{value.createdAt ? new Date(value.createdAt).toLocaleString() : ''}</td>
                            <td className="text-center">
                              <Stack direction="row" spacing={1}>
                                {/* Update Button */}
                                <UpdateNasabah nasabah={value} refreshTable={getNasabah} />
                                {/* Detail Button */}
                                <DetailNasabah nasabah={value} />
                                <IconButton color="error" aria-label="delete" size="large" onClick={() => deleteHandler(value)}>
                                  <DeleteIcon />
                                </IconButton>
                              </Stack>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default NasabahTable;
