import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './assets/css/index.css';
import {
  Login,
  Error,
  Admin,
  Stats,
  AddJob,
  AllJobs,
  Landing,
  Profile,
  EditJob,
  Register,
  HomeLayout,
  DashboardLayout,
} from './pages';

import { action as loginAction } from './pages/Login';
import { action as addJobAction } from './pages/AddJob';
import { action as editJobAction } from './pages/EditJob';
import { action as profileAction } from './pages/Profile';
import { action as registerAction } from './pages/Register';
import { action as deleteJobAction } from './pages/DeleteJob';

import { loader as statsLoader } from './pages/Stats';
import { loader as adminJobLoader } from './pages/Admin';
import { loader as allJobsLoader } from './pages/AllJobs';
import { loader as editJobLoader } from './pages/EditJob';
import { loader as dashboardLoader } from './pages/DashboardLayout';

// this function will run when components loads
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
          { path: 'stats', element: <Stats />, loader: statsLoader },
          { path: 'all-jobs', element: <AllJobs />, loader: allJobsLoader },
          { path: 'profile', element: <Profile />, action: profileAction },
          { path: 'admin', element: <Admin />, loader: adminJobLoader },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
