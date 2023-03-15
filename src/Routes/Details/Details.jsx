/* eslint-disable import/no-extraneous-dependencies */
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
  clearDetails, fetchCurrency, searchForConversion, setAmount,
} from '../../redux/Details/detailsSlice';
import Conversion from './Conversion';
import './Details.css';
import { setQuery } from '../../redux/Search/searchSlice';

/* code to determine if the Conversion element is darker according to the pattern */
const pattern = [false, true];

const resetPattern = () => {
  pattern[0] = false;
  pattern[1] = true;
};

const isDarker = (index, isLast) => {
  if (index < pattern.length) return pattern[index];
  const [first, last] = pattern;
  if (first === last) {
    pattern[1] = !last;
    if (isLast) resetPattern();
    return !last;
  }
  pattern[0] = !first;
  if (isLast) resetPattern();
  return last;
};
/* ------------------------------------------------------------------------------ */

const Details = () => {
  const dispatch = useDispatch();
  const { currency } = useParams();
  const {
    status, details, filteredConversions, error, amount,
  } = useSelector((store) => store.details);
  const { isSearching, query } = useSelector((store) => store.search);

  const onSubmit = (e) => {
    e.preventDefault();
    // se verifica que sea un numero
    const num = Number(amount);
    if (Number.isNaN(num)) return;
    // se verifica que sea positivo
    if (num < 1) return;

    dispatch(searchForConversion(query.toLowerCase()));
  };

  useEffect(() => {
    if (status !== 'idle') return undefined;
    dispatch(fetchCurrency(currency));

    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSearching) return;
    if (filteredConversions.length === 0 && isSearching) return;
    if (status !== 'fulfilled') return;
    dispatch(searchForConversion(''));
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

  const filteredConversionsList = useMemo(() => (
    filteredConversions.map(({ name, value }, index, arr) => (
      <Conversion
        key={uuid()}
        name={name}
        value={Number(value)}
        isDarker={isDarker(index, index === (arr.length - 1))}
      />
    ))
  ), [filteredConversions]);

  return (
    <div>
      {status === 'fulfilled' ? (
        <>
          <div className="header">
            <form className="amount-form" onSubmit={onSubmit}>
              <button type="submit" className="amount__submit">
                <span className="material-symbols-outlined">
                  autorenew
                </span>
              </button>
              <input
                className="amount"
                type="text"
                value={amount}
                onChange={({ target }) => dispatch(setAmount(target.value))}
                onBlur={({ target }) => Number(target.value) === 0 && dispatch(setAmount(1))}
              />
              <h2>
                {' '}
                {details.short}
                {' '}
                rates
              </h2>
            </form>
            <small>{details.date}</small>
          </div>
          <small className="subtitle-separator">List of conversions</small>
          <div className="conversions">
            {filteredConversionsList}
          </div>
        </>
      ) : render}
    </div>
  );
};

export default Details;
