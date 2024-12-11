import { useEffect } from 'react';

// material-ui
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import $ from 'jquery';
import KriteriaTable from './tableKriteria';

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
        <Grid item xs={12} md={12} sm={12}>
          <KriteriaTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default KriteriaPage;
