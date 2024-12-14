import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AjuanPage from 'views/pages/ajuan-kredit';
import GeneratedPage from 'views/pages/cpi-roc';

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
      element: <AjuanPage />
    },
    {
      path: 'hitung',
      element: <GeneratedPage />
    },
    {
      path: 'generated',
      element: <GeneratedPage />
    },
    {
      path: 'history',
      element: <RolePage />
    }
  ]
};

export default UtilsContent;
