import { createMemoryHistory } from '@remix-run/router';
import { Provider } from 'react-redux';
import { Router, RouterProvider } from 'react-router-dom';
import store from '../redux/store';
import router from '../router';

const history = createMemoryHistory();
const wrap = (component) => (
  <Router location={history.location} navigator={history}>
    <Provider store={store}>
      {component}
    </Provider>
  </Router>
);

const wrapRouter = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

export { wrapRouter };
export default wrap;
