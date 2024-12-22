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
import AjuanTableHistory from '../ajuan-kredit/tableAjuan-history';
import { formatRupiah } from 'constant/functionGlobal';

// ==============================|| PAGE ROLE ||============================== //

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null); // Initialize with null to handle loading state
  const [isLoading, setLoading] = useState(true);

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
      setLoading(false); // Data loaded, set loading to false
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  // Early return if still loading or data is not available
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Safe access to dashboard properties
  const currentUser = dashboard?.currentUser;
  const role = currentUser?.role_id;

  // Function to render dashboard cards
  const renderCard = (title, value, description) => (
    <Grid item xs={4} md={4}>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
        {title}
      </Typography>
      <Card variant="outlined">
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20, textAlign: 'center', padding: '0.4em' }}>
          {value}
        </Typography>
      </Card>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 12 }}>
        {description}
      </Typography>
    </Grid>
  );

  return role === 1 ? (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={5}
          md={5}
          sm={2}
          sx={{
            transform: 'scale(1)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        >
          <Card variant="outlined" sx={{ minWidth: 275, boxShadow: 3 }}>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 18, textAlign: 'center', padding: '0.4em' }}>
                Status Ajuan
              </Typography>
              <Grid container direction="row" spacing={2} sx={{ mt: 1, textAlign: 'center' }}>
                {renderCard('Aktif', dashboard?.ajuan_ready | '', 'Data yang sedang dalam proses')}
                {renderCard('Diterima', dashboard?.ajuan_approve | '', 'Data yang diterima ajuannya')}
                {renderCard('Ditolak', dashboard?.ajuan_reject | '', 'Data yang ditolak ajuannya')}
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
            transform: 'scale(1)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        >
          <Card variant="outlined" sx={{ minWidth: 275, boxShadow: 3 }}>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 18, textAlign: 'center', padding: '0.4em' }}>
                Kriteria
              </Typography>
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
            transform: 'scale(1)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        >
          <Card variant="outlined" sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 18, textAlign: 'center', padding: '0.4em' }}>
                Total Dana Keluar
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={5} md={5} sx={{ textAlign: 'center' }}>
                  <Card variant="outlined">
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20, textAlign: 'center', padding: '0.4em' }}>
                      {formatRupiah(dashboard.jumlah_dana)}
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
            <AjuanTableHistory />
          </Card>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8} md={8} sm={4} sx={{ textAlign: 'center' }}>
          <Card variant="outlined" sx={{ minWidth: 275, boxShadow: 3 }}>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 18, textAlign: 'center', padding: '0.4em' }}>
                Status Ajuan
              </Typography>
              <Grid container direction="row" spacing={2} sx={{ mt: 1, textAlign: 'center' }}>
                {renderCard('Aktif', dashboard.ajuan_ready, 'Data yang sedang dalam proses')}
                {renderCard('Diterima', dashboard.ajuan_approve, 'Data yang diterima ajuannya')}
                {renderCard('Ditolak', dashboard.ajuan_reject, 'Data yang ditolak ajuannya')}
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
