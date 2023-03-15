/* eslint-disable import/no-extraneous-dependencies */
import { createMemoryHistory } from '@remix-run/router';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import store from '../redux/store';

const history = createMemoryHistory();
const wrap = (component) => (
  <Router location={history.location} navigator={history}>
    <Provider store={store}>
      {component}
    </Provider>
  </Router>
);

export default wrap;
