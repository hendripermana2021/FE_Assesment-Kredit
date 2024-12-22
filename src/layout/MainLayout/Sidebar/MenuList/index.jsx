// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useEffect, useState } from 'react';
import { serverSourceDev } from 'constant/constantaEnv';
import axios from 'axios';
import menuItemsPetugas from 'menu-items/petugas';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await axios.get(`${serverSourceDev}me`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      setProfile(response.data.data);
      // console.log(sessionStorage.getItem('accessToken'));
    } catch (error) {
      if (error.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Data Tidak Ada',
          text: 'Maaf Data tidak ditemukan atau belum dibuat',
          willOpen: () => {
            // Apply inline CSS to set z-index for SweetAlert modal
            const swalContainer = document.querySelector('.swal2-container');
            if (swalContainer) {
              swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
            }
          }
        });
      }
      console.log(error, 'Error fetching data');
    }
  };

  const menuItems = profile?.role_id === 1 ? menuItem : menuItemsPetugas;

  const navItems = menuItems.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
