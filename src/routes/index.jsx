import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './AuthenticationRoutes';
import MasterRoutes from './MasterRoutes';
import UtilsContent from './UtilsContent';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([MainRoutes, LoginRoutes, MasterRoutes, UtilsContent], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
