import { Outlet } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav>
        <i>Navbar component</i>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
