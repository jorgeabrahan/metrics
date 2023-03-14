/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { fetchCurrencies } from '../../redux/Currencies/currenciesSlice';
import Currency from './Currency';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { currencies } = useSelector((store) => store.currencies);

  useEffect(() => {
    if (currencies.length !== 0) return;
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const currenciesList = currencies.map(({
    short, name,
  }) => (
    <Currency
      key={uuid()}
      short={short}
      name={name}
    />
  ));

  return (
    <section>
      <div className="currencies__header">
        <h2>
          Currency
          <br />
          Rates
        </h2>
        <small>Includes cryptocurrencies</small>
      </div>
      <small className="currencies__title">List of available currencies</small>
      <div className="currencies">
        { currenciesList }
      </div>
    </section>
  );
};

export default Home;
