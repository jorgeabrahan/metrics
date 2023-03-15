/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { fetchCurrencies, searchForCurrency } from '../../redux/Currencies/currenciesSlice';
import { setQuery } from '../../redux/Search/searchSlice';
import Currency from './Currency';
import './Home.css';

const createList = (currencies) => currencies.map(({ short, name }) => (
  <Currency
    key={uuid()}
    short={short}
    name={name}
  />
));

const Home = () => {
  const dispatch = useDispatch();
  const {
    currencies, filteredCurrencies, status, error,
  } = useSelector((store) => store.currencies);
  const { isSearching } = useSelector((store) => store.search);

  useEffect(() => {
    if (currencies.length !== 0) return;
    dispatch(fetchCurrencies());
  }, [dispatch]);

  useEffect(() => {
    if (isSearching) return;
    dispatch(searchForCurrency(''));
    dispatch(setQuery(''));
  }, [dispatch, isSearching]);

  let render = <p>Loading...</p>;
  if (status === 'rejected') {
    render = (
      <p>
        [Error]:
        {error}
      </p>
    );
  }
  if (status === 'fulfilled') {
    render = createList(filteredCurrencies);
  }

  return (
    <section>
      <div className="header">
        <h2>
          Currency
          <br />
          Rates
        </h2>
        <small>Includes cryptocurrencies</small>
      </div>
      <small className="subtitle-separator">List of available currencies</small>
      <div className="currencies">
        {render}
      </div>
    </section>
  );
};

export default Home;
