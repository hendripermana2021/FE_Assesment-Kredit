// material-ui
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import RolesTable from './tableRole';

// ==============================|| PAGE ROLE ||============================== //

const RolePage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} sm={6}>
          <RolesTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RolePage;
