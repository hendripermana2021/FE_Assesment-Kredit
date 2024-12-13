import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { CssBaseline, styled, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import { SET_MENU } from 'store/actions';
import { drawerWidth } from 'store/constant';

// assets
import { IconChevronRight } from '@tabler/icons-react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? 0 : -(drawerWidth - 20),
    width: `calc(100% - ${drawerWidth}px)`
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
    marginRight: '10px'
  }
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  const token = sessionStorage.getItem('accessToken');
  console.log('Token', token);

  useEffect(() => {
    if (!token) {
      // If token doesn't exist, show SweetAlert
      Swal.fire({
        title: 'Authentication Required',
        text: 'You need to login to access this page.',
        icon: 'warning',
        confirmButtonText: 'Login',
        willOpen: () => {
          // Apply inline CSS to set z-index for SweetAlert modal
          const swalContainer = document.querySelector('.swal2-container');
          if (swalContainer) {
            swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
          }
        }
      }).then(() => {
        // Redirect to login page
        window.location.href = '/login';
      });
    } else {
      // Token exists
      console.log('Token found:', token);
    }
  }, [token]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

      {/* main content */}
      <Main theme={theme} open={leftDrawerOpened}>
        {/* breadcrumb */}
        <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
        <Outlet />
      </Main>
      <Customization />
    </Box>
  );
};

export default MainLayout;
