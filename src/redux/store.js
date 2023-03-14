/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import currenciesSlice from './Currencies/currenciesSlice';
import searchSlice from './Search/searchSlice';

const store = configureStore({
  reducer: {
    currencies: currenciesSlice,
    search: searchSlice,
  },
});

export default store;
