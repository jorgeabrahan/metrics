/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../redux/store';
import Currency from '../Routes/Home/Currency';

describe('Tests for <Currency /> component', () => {
  const createCurrency = (
    <Currency
      short="usd"
      name="United States Dollar"
    />
  );

  const wrap = (component) => (
    <Provider store={store}>
      {component}
    </Provider>
  );

  it('Should render the content correctly', () => {
    render(wrap(createCurrency()));
    expect(screen.getByText('usd')).not.toBeNull();
    expect(screen.getByText('United States Dollar')).not.toBeNull();
  });

  it('Should match the snapshot', () => {
    expect(renderer.create(wrap(createCurrency())).toJSON()).toMatchSnapshot();
  });
});
