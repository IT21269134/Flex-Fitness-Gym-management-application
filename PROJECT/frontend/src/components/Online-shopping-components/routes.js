import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Home from '../../pages/Shop_pages/Home';
import AdminDashBoard from '../../pages/Shop_pages/AdminDashBoard';
import ExpenseDashboard from './pages/ExpenseDashboard'
import Homes from "../../pages/homepage/Home";
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <AdminDashBoard/> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'payment', element: <UserPage/> },

      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: <Homes />,
    },

  ]);

  return routes;
}
