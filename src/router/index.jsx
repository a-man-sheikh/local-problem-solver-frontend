import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home/Home';
import NotFound from '@/pages/NotFound/NotFound';
import Register from '@/pages/Register/Register';
import Login from '@/pages/Login/Login';

/**
 * Centralized route definitions
 * Add new routes as children of the MainLayout or at the root level
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },

      // ── Add more routes here ──────────────────────────
      // { path: 'dashboard', element: <Dashboard /> },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
