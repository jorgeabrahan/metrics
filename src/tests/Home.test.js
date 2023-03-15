/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import Home from '../Routes/Home/Home';
import wrap from './testResources';

jest.mock('axios');

axios.get.mockResolvedValue({
  data: {
    afn: 'Afghan afghani',
    algo: 'Algorand',
    all: 'Albanian lek',
    amd: 'Armenian dram',
  },
});

describe('Tests for <Home /> component', () => {
  render(wrap(<Home />));
  it('Should render childs from API correctly', () => {
    expect(screen.getByText('Afghan afghani')).not.toBeNull();
    expect(screen.getByText('Algorand')).not.toBeNull();
    expect(screen.getByText('Albanian lek')).not.toBeNull();
    expect(screen.getByText('Armenian dram')).not.toBeNull();
  });

  it('Should not display the loading message', () => {
    expect(() => screen.getByText('Loading...')).toThrow();
  });

  it('Should display currencies as links', () => {
    render(wrap(<Home />));
    expect(screen.getByText('Afghan afghani').closest('a').href.includes('afn')).toBeTruthy();
    expect(screen.getByText('Algorand').closest('a').href.includes('algo')).toBeTruthy();
    expect(screen.getByText('Albanian lek').closest('a').href.includes('all')).toBeTruthy();
    expect(screen.getByText('Armenian dram').closest('a').href.includes('amd')).toBeTruthy();
  });

  it('Should match the snapshot', () => {
    expect(renderer.create(wrap(<Home />)).toJSON()).toMatchSnapshot();
  });
});
