// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Customer',
    path: '/Customer_Dashboard',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/productList',
    icon: icon('ic_cart'),
  },
  {
    title: 'Inventory',
    path: '/inventory_home',
    icon: icon('ic_blog'),
  },
  {
    title: 'Trainer',
    path: '/Trainer_home',
    icon: icon('ic_blog'),
  },
  {
    title: 'Doctor',
    path: '/Doctor_register',
    icon: icon('ic_blog'),
  },
  {
    title: 'payment',
    path: '/paymenttt',
    icon: icon('ic_blog'),
  },
  
 
];

export default navConfig;
