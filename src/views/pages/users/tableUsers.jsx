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
import AddUsers from './addUsers';
import UpdateUsers from './updateUsers';
import DetailUsers from './detailUsers';

const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable('#tblUsers')) {
      $(document).ready(function () {
        const tableInterval = setInterval(() => {
          if ($('#tblUsers').is(':visible')) {
            clearInterval(tableInterval);
            $('#tblUsers').DataTable();
          }
        }, 1000);
      });
    }
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${serverSourceDev}users`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      setUsers(response.data.data);
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
          await axios.delete(`${serverSourceDev}users/delete/${data.id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
          });
          getUsers(); // Reload the data after deletion
          Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Your data cannot be deleted.', 'error');
          console.error('Error deleting data:', error);
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader
        title="Data Users"
        subheader="Ini adalah page table untuk melakukan pengaturan atau CRUD pada data user pengguna terhadap aplikasi"
      />
      <CardContent>
        <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em' }}>
          <Grid container spacing={2}>
            {' '}
            <Grid item xs={8} md={8} sm={4}></Grid>
            <Grid item xs={4} md={4} sm={2} sx={{ textAlign: 'right' }}>
              {' '}
              <AddUsers refreshTable={getUsers} />
            </Grid>
          </Grid>
          <CardContent>
            <table className="table table-hover " id="tblUsers">
              <thead>
                <tr>
                  <th className="text-center">No.</th>
                  <th className="text-center">Name Users</th>
                  <th className="text-center">Gender</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Password</th>
                  <th className="text-center">Role</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7">Loading...</td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Users available
                    </td>
                  </tr>
                ) : (
                  users.map((value, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td>{value.name_user}</td>
                      <td>{value.gender}</td>
                      <td>{value.email}</td>
                      <td>{value.real_password}</td>
                      <td>{value.role.role_name}</td>
                      <td className="text-center">
                        <Stack direction="row" spacing={1}>
                          {/* Update Button */}
                          <UpdateUsers users={value} refreshTable={getUsers} />
                          {/* Detail Button */}
                          <DetailUsers users={value} />
                          <IconButton color="danger" aria-label="delete" size="large" onClick={() => deleteHandler(value)}>
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

export default TableUsers;
