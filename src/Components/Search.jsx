/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchForCurrency } from '../redux/Currencies/currenciesSlice';
import './Search.css';

const Search = () => {
  const dispatch = useDispatch();
  const searchInput = useRef();
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    searchInput.current.focus();
    if (!pathname.includes('home')) return;
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
        onChange={({ target }) => setQuery(target.value)}
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
