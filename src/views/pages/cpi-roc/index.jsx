// material-ui
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GeneratedTable from './tableGenerated';

// ==============================|| PAGE ROLE ||============================== //

const GeneratedPage = () => {
  // const [isLoading, setLoading] = useState(true);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} sm={6}>
          <GeneratedTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneratedPage;
