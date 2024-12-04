import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './assets/css/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Home</h1>,
  },
  {
    path: '/about',
    element: <h1>About Page</h1>,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
export default App;
