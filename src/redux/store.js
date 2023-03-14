/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import currenciesSlice from './Currencies/currenciesSlice';

const store = configureStore({
  reducer: {
    currencies: currenciesSlice,
  },
});

export default store;
