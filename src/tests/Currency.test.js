/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Currency from '../Routes/Home/Currency';
import wrap from './testResources';

describe('Tests for <Currency /> component', () => {
  const currency = (
    <Currency
      short="usd"
      name="United States Dollar"
    />
  );

  it('Should render the content correctly', () => {
    render(wrap(currency));
    expect(screen.getByText('usd')).not.toBeNull();
    expect(screen.getByText('United States Dollar')).not.toBeNull();
  });

  it('Should match the snapshot', () => {
    expect(renderer.create(wrap(currency)).toJSON()).toMatchSnapshot();
  });
});
