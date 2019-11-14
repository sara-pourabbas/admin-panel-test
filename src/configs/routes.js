import React from 'react';
import DefaultLayout from '../containers/DefaultLayout';


const Dashboard = React.lazy(() => import('../views/Dashboard'));
const FormDemo = React.lazy(() => import('../views/FormDemo'));
const UserDetail = React.lazy(() => import('../views/FormDemo/Detail'));
const Map = React.lazy(() => import('../views/Map'));
const Weather = React.lazy(() => import('../views/Weather'));
// const Payment = React.lazy(() => import('../views/Payment'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/formdemo/:id', name: 'UserDetail', component: UserDetail },
  { path: '/formdemo', name: 'FormDemo', component: FormDemo },
  { path: '/map', name: 'Map', component: Map },
  { path: '/weather', name: 'Weather', component: Weather },
  // { path: '/payment', name: 'Payment', component: Payment }
];

export default routes;
