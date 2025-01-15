import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './assets/css/index.css';
import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Landing,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
} from './pages';

import { action as loginAction } from './pages/Login';
import { action as addJobAction } from './pages/AddJob';
import { action as registerAction } from './pages/Register';
import { loader as dashboardLoader } from './pages/DashboardLayout';

// this function will run when components loads
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          { path: 'stats', element: <Stats /> },
          { path: 'all-jobs', element: <AllJobs /> },
          { path: 'profile', element: <Profile /> },
          { path: 'admin', element: <Admin /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
export default App;
