import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { wrapRouter } from './testResources';

describe('Tests for <Navbar /> component', () => {
  render(wrapRouter());
  it('Should render the Home route by default', () => {
    expect(screen.getByText('List of available currencies')).not.toBeNull();
    expect(screen.getByText('Currencies')).not.toBeNull();
  });

  it('Shouldn\'t render the search bar by default', () => {
    expect(() => screen.getByRole('searchbox')).toThrow();
  });

  it('Should match snapshot', () => {
    expect(renderer.create(wrapRouter()).toJSON()).toMatchSnapshot();
  });
});
