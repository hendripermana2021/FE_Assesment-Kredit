import { useEffect, useState } from 'react';
import { IconButton, Card, CardHeader, CardContent, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { serverSourceDev } from 'constant/constantaEnv';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Stack } from '@mui/system';
import DetailRoles from './detailRoles';
import UpdateRoles from './updateRole';
import AddRoles from './addRoles';

const RolesTable = () => {
  const [role, setRole] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable('#tblRole')) {
      $(document).ready(function () {
        const tableInterval = setInterval(() => {
          if ($('#tblRole').is(':visible')) {
            clearInterval(tableInterval);
            $('#tblRole').DataTable();
          }
        }, 1000);
      });
    }
    getRole();
  }, []);

  const getRole = async () => {
    try {
      const response = await axios.get(`${serverSourceDev}role`, {});
      setRole(response.data.data);
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
      } else {
        handleError(error, 'Error fetching Role data');
      }
      console.log(error, 'Error fetching data');
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
          await axios.delete(`${serverSourceDev}role/delete/${data.id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
          });
          getRole();
          Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting data:', error);
          Swal.fire('Error!', 'Your data cannot be deleted.', 'error');
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader
        title="Role Users"
        subheader="Ini adalah page table untuk melakukan pengaturan atau CRUD pada data role/ otoritas user terhadap aplikasi"
      />
      <CardContent>
        <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em' }}>
          <Grid container spacing={2}>
            {' '}
            <Grid item xs={8} md={8} sm={4}></Grid>
            <Grid item xs={4} md={4} sm={2} sx={{ textAlign: 'right' }}>
              {' '}
              <AddRoles refreshTable={getRole} />
            </Grid>
          </Grid>
          <CardContent>
            <table className="table table-hover " id="tblRole">
              <thead>
                <tr>
                  <th className="text-center" align="center" style={{ width: '10%' }}>
                    No.
                  </th>
                  <th className="text-center" align="center" style={{ width: '80%' }}>
                    Role Name
                  </th>
                  <th className="text-center" align="center" style={{ width: '10%' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3">Loading...</td>
                  </tr>
                ) : role.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No Role available
                    </td>
                  </tr>
                ) : (
                  role.map((roles, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td>{roles.role_name}</td>
                      <td className="text-center">
                        <Stack direction="row" spacing={1}>
                          {/* Update Button */}
                          <UpdateRoles role={roles} refreshTable={getRole} />
                          {/* Detail Button */}
                          <DetailRoles role={roles} />
                          <IconButton color="danger" aria-label="delete" size="large" onClick={() => deleteHandler(roles)}>
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default RolesTable;
