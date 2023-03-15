/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import wrap from './testResources';
import Details from '../Routes/Details/Details';

jest.mock('axios');
const mockResponse = {
  data: {
    date: '2023-03-14',
    usd: {
      aave: 0.013188,
      ada: 2.906034,
      aed: 3.673007,
      afn: 88.499179,
    },
  },
};

describe('Tests for <Details /> component', () => {
  axios.get.mockResolvedValue(mockResponse);
  render(wrap(<Details />));
  it('Should render conversions from API with values fixed to 2', () => {
    expect(screen.getByText('aave')).not.toBeNull();
    expect(screen.getByText('ada')).not.toBeNull();
    expect(screen.getByText('aed')).not.toBeNull();
    expect(screen.getByText('afn')).not.toBeNull();

    expect(screen.getByText('0.01')).not.toBeNull();
    expect(screen.getByText('2.91')).not.toBeNull();
    expect(screen.getByText('3.67')).not.toBeNull();
    expect(screen.getByText('88.5')).not.toBeNull();
  });

  it('Should not display the loading message', () => {
    expect(() => screen.getByText('Loading...')).toThrow();
  });

  it('Should match the snapshot', () => {
    expect(renderer.create(wrap(<Details />)).toJSON()).toMatchSnapshot();
  });
});
