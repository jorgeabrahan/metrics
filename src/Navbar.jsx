import {
  NavLink, Outlet, useLocation, useParams,
} from 'react-router-dom';
import './Navbar.css';

const capitalize = (word) => (
  `${word[0].toUpperCase()}${word.slice(1, word.length)}`
);

function Navbar() {
  const { pathname } = useLocation();
  const { currency } = useParams();

  const isShowingDetails = pathname.split('/')[1] === 'details';

  return (
    <>
      <nav className="nav center">
        {isShowingDetails && (
          <NavLink to="/home" className="reset">
            <span className="material-symbols-outlined">
              arrow_back_ios
            </span>
          </NavLink>
        )}
        <h1 className="nav__title">
          {isShowingDetails ? capitalize(currency) : 'Currencies'}
        </h1>
        <button className="reset" type="button">
          <span className="material-symbols-outlined">
            search
          </span>
        </button>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
