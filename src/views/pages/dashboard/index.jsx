import { useEffect } from 'react';

// material-ui
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import $ from 'jquery';

// ==============================|| PAGE ROLE ||============================== //

const Dashboard = () => {
  // const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable('#tblHistory')) {
      $(document).ready(function () {
        const tableInterval = setInterval(() => {
          if ($('#tblHistory').is(':visible')) {
            clearInterval(tableInterval);
            $('#tblHistory').DataTable();
          }
        }, 1000);
      });
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={3}
          md={3}
          sm={1}
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
                  Ajuan Diterima
                </Typography>
              </Card>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={3} md={3} sx={{ textAlign: 'center' }}>
                  <Card variant="outlined">
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20, textAlign: 'center', padding: '0.4em' }}>
                      20
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={9} md={9}>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                    Nasabah
                  </Typography>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 12 }}>
                    Data yang diterima ajuannya
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
          sm={1}
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
                  Ajuan Ditolak
                </Typography>
              </Card>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {' '}
                <Grid item xs={3} md={3} sx={{ textAlign: 'center' }}>
                  <Card variant="outlined">
                    {' '}
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20, textAlign: 'center', padding: '0.4em' }}>
                      20
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={9} md={9}>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                    Nasabah
                  </Typography>
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
          xs={6}
          md={6}
          sm={4}
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
                      Rp. 1.000.000.000
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={7} md={7}>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                    Dana Keluar
                  </Typography>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 12 }}>
                    Total dana disalurkan kepada pengaju
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} sm={6}>
          <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em' }}>
            <table className="table table-hover " id="tblHistory">
              <thead>
                <tr>
                  <th className="text-center">ID</th>
                  <th className="text-center">Name Program</th>
                  <th className="text-center">Kriteria</th>
                  <th className="text-center">Dana Allocated</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
            </table>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
