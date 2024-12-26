import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// utilities routing
const HistoryPage = Loadable(lazy(() => import('views/pages/history')));
const GeneratedPage = Loadable(lazy(() => import('views/pages/cpi-roc')));
const AjuanPage = Loadable(lazy(() => import('views/pages/ajuan-kredit')));

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
      path: 'history',
      element: <HistoryPage />
    }
  ]
};

export default UtilsContent;
