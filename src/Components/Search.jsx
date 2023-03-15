/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchForCurrency } from '../redux/Currencies/currenciesSlice';
import { searchForConversion } from '../redux/Details/detailsSlice';
import { setQuery } from '../redux/Search/searchSlice';
import './Search.css';

const Search = () => {
  const dispatch = useDispatch();
  const searchInput = useRef();
  const { pathname } = useLocation();
  const { query } = useSelector((store) => store.search);

  useEffect(() => {
    searchInput.current.focus();
    return () => {
      dispatch(setQuery(''));
    };
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    searchInput.current.focus();
    if (pathname.includes('details')) {
      dispatch(searchForConversion(query.toLowerCase()));
      return;
    }
    dispatch(searchForCurrency(query.toLowerCase()));
  };

  return (
    <form className="search" onSubmit={onSubmit}>
      <input
        className="search__input"
        ref={searchInput}
        type="search"
        placeholder="Search for a currency..."
        value={query}
        onChange={({ target }) => dispatch(setQuery(target.value))}
      />
      <button className="search__submit" type="submit">
        <span className="material-symbols-outlined">
          search_check
        </span>
      </button>
    </form>
  );
};

export default Search;
