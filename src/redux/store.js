/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import currenciesSlice from './Currencies/currenciesSlice';
import detailsSlice from './Details/detailsSlice';
import searchSlice from './Search/searchSlice';

const store = configureStore({
  reducer: {
    currencies: currenciesSlice,
    search: searchSlice,
    details: detailsSlice,
  },
});

export default store;
