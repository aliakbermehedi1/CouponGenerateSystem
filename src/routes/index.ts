import { lazy } from 'react';
import CustomerInvoice from '../pages/Admin/CustomerInvoice';
import CustomerinvoiceDetails from '../pages/Admin/CustomerInvoice/CustomerinvoiceDetails';
import RollMasterDashboard from '../pages/Admin/RollMaster/RollMasterDashboard';
import BranchDashboard from '../pages/Admin/Branch/BranchDashboard';
import UserDashboard from '../pages/Admin/User/UserDashboard';
import GenerateCouponDashboard from '../pages/Admin/GenerateCoupon/GenerateCouponDashboard';
import CouponPage from '../pages/Coupon/CouponPage';
import UpdateOffer from '../pages/Admin/UpdateOffer/UpdateOffer';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const CustomerRegister = lazy(() => import('../pages/Admin/CustomerRegister'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: '/CustomerRegister',
    title: 'Customer Register',
    component: CustomerRegister,
  },
  {
    path: '/CustomerInvoice',
    title: 'Customer Invoice',
    component: CustomerInvoice,
  },
  {
    path: '/CustomerInvoiceDetails',
    title: 'Customer Invoice Details',
    component: CustomerinvoiceDetails,
  },
  {
    path: '/rollMaster',
    title: 'Roll Master',
    component: RollMasterDashboard,
  },
  {
    path: '/branchDashboard',
    title: 'Branch Dashboard',
    component: BranchDashboard,
  },
  {
    path: '/userDashboard',
    title: 'User Dashboard',
    component: UserDashboard,
  },
  {
    path: '/generateCouponDashboard',
    title: 'Generate Dashboard',
    component: GenerateCouponDashboard,
  },
  {
    path: '/couponPage',
    title: 'Coupon Page',
    component: CouponPage,
  },
  {
    path: '/updateOfferData',
    title: 'Update Offer Data',
    component: UpdateOffer,
  },
];

const routes = [...coreRoutes];
export default routes;
