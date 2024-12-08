import { useEffect } from 'react';

// material-ui
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import $ from 'jquery';
import { CardHeader } from '@mui/material';
import AddKriteria from './addKriteria';

// ==============================|| PAGE ROLE ||============================== //

const KriteriaPage = () => {
  // const [isLoading, setLoading] = useState(true);

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
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} sm={6}>
          <Card>
            <CardHeader
              title="Kriteria dan Sub-Kriteria"
              subheader="Ini adalah page table untuk melakukan pengaturan atau CRUD pada data Kriteria dan Sub-kriteria aplikasi"
            />
            <CardContent>
              <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em' }}>
                <Grid container spacing={2}>
                  {' '}
                  <Grid item xs={8} md={8} sm={4}></Grid>
                  <Grid item xs={4} md={4} sm={2} sx={{ textAlign: 'right' }}>
                    {' '}
                    <AddKriteria />
                  </Grid>
                </Grid>
                <CardContent>
                  <table className="table table-hover " id="tblNasabah">
                    <thead>
                      <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Name Kriteria</th>
                        <th className="text-center">Type</th>
                        <th className="text-center">Sub-Kriteria</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                  </table>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default KriteriaPage;
