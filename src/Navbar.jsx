import {
  NavLink, Outlet, useLocation, useParams,
} from 'react-router-dom';
import './Navbar.css';

const capitalize = (word) => (
  `${word[0].toUpperCase()}${word.slice(1, word.length)}`
);

function Navbar() {
  const { pathname } = useLocation();
  const { country } = useParams();

  const isShowingDetails = pathname.split('/')[1] === 'details';

  return (
    <>
      <nav className="nav center">
        {isShowingDetails && (
          <NavLink to="/home" className="reset">
            <span className="material-symbols-outlined">
              arrow_back_ios
            </span>
            <span>{capitalize(country)}</span>
          </NavLink>
        )}
        <h1 className="nav__title">Air Pollution</h1>
        <button className="reset" type="button">
          <span className="material-symbols-outlined">
            filter_list
          </span>
        </button>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
