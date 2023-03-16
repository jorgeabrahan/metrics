import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Search from '../Components/Search';
import store from '../redux/store';
import wrap from './testResources';
import { setQuery } from '../redux/Search/searchSlice';

describe('Tests for <Search /> component', () => {
  render(wrap(<Search />));
  it('Should render the search form', () => {
    expect(screen.getByRole('button', { name: 'search_check' })).not.toBeNull();
    expect(screen.getByRole('searchbox')).not.toBeNull(); // search box input
  });

  it('Should have an empty query by default', () => {
    expect(store.getState().search.query).toBe('');
  });

  it('Should change the query when searching', () => {
    store.dispatch(setQuery('USD'));
    expect(store.getState().search.query).toBe('USD');
  });

  it('Should match the snapshot', () => {
    expect(renderer.create(wrap(<Search />)).toJSON()).toMatchSnapshot();
  });
});
