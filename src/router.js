import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Navbar from './Navbar';
import Details from './Routes/Details/Details';
import Home from './Routes/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'details/:currency',
        element: <Details />,
      },
    ],
  },
]);

export default router;
