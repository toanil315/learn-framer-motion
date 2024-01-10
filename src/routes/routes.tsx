import loadable from '@loadable/component';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { DefaultLayout } from '@/layouts';
import { ROUTES } from '@/constants';

const Home = loadable(() => import('@/pages/Home/'));

const routeList: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      // PUBLIC routes
      {
        path: ROUTES.HOME,
        element: <Home />,
        children: [],
      },
    ],
  },
];

const Routes = () => {
  const element = useRoutes(routeList);
  return element;
};

export default Routes;
