// Reference https://gist.github.com/shelldandy/02ad1a9f8b5b86d1b2e4dd26a11967b2

import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';

const routes = [
  {
    title: "Dashboard",
    path: '/admin/',
    exact: true,
    component: Dashboard,
  },
  {
    title: "Categories",
    path: '/admin/categories/',
    exact: true,
    component: Categories,
  }
];

export default routes;
