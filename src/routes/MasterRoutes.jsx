import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import KriteriaPage from 'views/pages/kriteria-sub';

// utilities routing
const RolePage = Loadable(lazy(() => import('views/pages/role-users/index')));
const NasabahPage = Loadable(lazy(() => import('views/pages/nasabah/index')));
const UsersPage = Loadable(lazy(() => import('views/pages/users/index')));

// sample page routing

// ==============================|| MAIN ROUTING ||============================== //

const MasterRoutes = {
  path: '/master',
  element: <MainLayout />,
  children: [
    {
      path: 'role-users',
      element: <RolePage />
    },
    {
      path: 'nasabah',
      element: <NasabahPage />
    },
    {
      path: 'users',
      element: <UsersPage />
    },
    {
      path: 'kriteria-sub',
      element: <KriteriaPage />
    }
  ]
};

export default MasterRoutes;
