import { useEffect, useState } from 'react';

// material-ui
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import AjuanTable from '../ajuan-kredit/tableAjuan';
import axios from 'axios';
import { serverSourceDev } from 'constant/constantaEnv';

// ==============================|| PAGE ROLE ||============================== //

const Dashboard = () => {
  // const [isLoading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const response = await axios.get(`${serverSourceDev}dashboard`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      setDashboard(response.data.data);
      // console.log(sessionStorage.getItem('accessToken'));
    } catch (error) {
      if (error.status === 404) {
        swalError(`Data not found.`);
      }
      console.log(error, 'Error fetching data');
    }
  };

  console.log('dashboard data :', dashboard);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={5}
          md={5}
          sm={2}
          sx={{
            transform: 'scale(1)', // Ensure the default state is scaled at 1 (original size)
            transition: 'transform 0.3s ease-in-out', // Apply transition for both hover and non-hover states
            '&:hover': {
              transform: 'scale(1.05)' // Slightly increase the scale on hover
            }
          }}
        >
          <Card variant="outlined" sx={{ minWidth: 275, boxShadow: 3 }}>
            <CardContent>
              <Card variant="outlined" sx={{ minWidth: 275 }}>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 18, textAlign: 'center', padding: '0.4em' }}>
                  Status Ajuan
                </Typography>
              </Card>
              <Grid container direction="row" spacing={2} sx={{ mt: 1, textAlign: 'center' }}>
                <Grid item direction="column" xs={4} md={4}>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                    Aktif
                  </Typography>
                  <Card variant="outlined">
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20, textAlign: 'center', padding: '0.4em' }}>
                      {dashboard.ajuan_ready}
                    </Typography>
                  </Card>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 12 }}>
                    Data yang sedang dalam proses
                  </Typography>
                </Grid>
                <Grid item direction="column" xs={4} md={4}>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                    Diterima
                  </Typography>
                  <Card variant="outlined">
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20, textAlign: 'center', padding: '0.4em' }}>
                      {dashboard.ajuan_approve}
                    </Typography>
                  </Card>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 12 }}>
                    Data yang diterima ajuannya
                  </Typography>
                </Grid>
                <Grid item direction="column" xs={4} md={4}>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                    Ditolak
                  </Typography>
                  <Card variant="outlined">
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20, textAlign: 'center', padding: '0.4em' }}>
                      {dashboard.ajuan_reject}
                    </Typography>
                  </Card>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 12 }}>
                    Data yang ditolak ajuannya
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={3}
          md={3}
          sm={2}
          sx={{
            transform: 'scale(1)', // Ensure the default state is scaled at 1 (original size)
            transition: 'transform 0.3s ease-in-out', // Apply transition for both hover and non-hover states
            '&:hover': {
              transform: 'scale(1.05)' // Slightly increase the scale on hover
            }
          }}
        >
          <Card variant="outlined" sx={{ minWidth: 275, boxShadow: 3 }}>
            <CardContent>
              <Card variant="outlined" sx={{ minWidth: 275 }}>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 18, textAlign: 'center', padding: '0.4em' }}>
                  Kriteria
                </Typography>
              </Card>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={3} md={3} sx={{ textAlign: 'center' }}>
                  <Card variant="outlined">
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20, textAlign: 'center', padding: '0.4em' }}>
                      {dashboard.kriteria}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item direction="column" xs={9} md={9}>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                    Total Kriteria
                  </Typography>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 12 }}>
                    Kriteria yang digunakan untuk melakukan penilaian terhadap nasabah
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={4}
          md={4}
          sm={2}
          sx={{
            transform: 'scale(1)', // Ensure the default state is scaled at 1 (original size)
            transition: 'transform 0.3s ease-in-out', // Apply transition for both hover and non-hover states
            '&:hover': {
              transform: 'scale(1.05)' // Slightly increase the scale on hover
            }
          }}
        >
          <Card variant="outlined" sx={{ boxShadow: 3 }}>
            <CardContent>
              <Card variant="outlined">
                {' '}
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 18, textAlign: 'center', padding: '0.4em' }}>
                  Total Dana Keluar
                </Typography>
              </Card>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {' '}
                <Grid item xs={5} md={5} sx={{ textAlign: 'center' }}>
                  <Card variant="outlined">
                    {' '}
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20, textAlign: 'center', padding: '0.4em' }}>
                      {dashboard.jumlah_dana}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={7} md={7}>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                    Dana Keluar
                  </Typography>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 12 }}>
                    Total dana disalurkan kepada pengaju, yang diterima ajuannya
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} sm={6}>
          <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em' }}>
            <AjuanTable />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
