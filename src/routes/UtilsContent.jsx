import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';


// utilities routing
const RolePage = Loadable(lazy(() => import('views/pages/role-users/index')));

// sample page routing

// ==============================|| MAIN ROUTING ||============================== //

const UtilsContent = {
  path: '/utils',
  element: <MainLayout />,
  children: [
    {
      path: 'ajuan-kredit',
      element: <RolePage />
    },
    {
      path: 'hitung',
      element: <RolePage />
    },
    {
      path: 'generated',
      element: <RolePage />
    },
    {
      path: 'history',
      element: <RolePage />
    },
  ]
};

export default UtilsContent;
