import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Conversion from '../Routes/Details/Conversion';
import wrap from './testResources';

describe('Tests for <Conversion /> component', () => {
  const conversion = (
    <Conversion
      name="usd"
      value={120}
      isDarker={false}
    />
  );

  it('Should render the content correctly', () => {
    render(wrap(conversion));
    expect(screen.getByText('usd')).not.toBeNull();
    expect(screen.getByText('120')).not.toBeNull();
  });

  it('Should match the snapshot', () => {
    expect(renderer.create(wrap(conversion)).toJSON()).toMatchSnapshot();
  });
});
