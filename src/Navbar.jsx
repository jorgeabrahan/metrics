/* eslint-disable import/no-extraneous-dependencies */
import {
  NavLink, Outlet, useLocation, useParams,
} from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Search from './Components/Search';
import { toggleSearch } from './redux/Search/searchSlice';

function Navbar() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { currency } = useParams();
  const { isSearching } = useSelector((store) => store.search);

  useEffect(() => {
    if (!isSearching) return;
    dispatch(toggleSearch());
  }, [pathname]);

  const isShowingDetails = pathname.includes('details');

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
          {isShowingDetails ? `Currency / ${currency.toUpperCase()}` : 'Currencies'}
        </h1>
        <button className="reset" type="button" onClick={() => dispatch(toggleSearch())}>
          <span className="material-symbols-outlined">
            {isSearching ? 'search_off' : 'search'}
          </span>
        </button>
      </nav>
      {isSearching && <Search />}
      <Outlet />
    </>
  );
}

export default Navbar;
