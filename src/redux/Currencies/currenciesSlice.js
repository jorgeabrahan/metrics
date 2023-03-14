/* eslint-disable import/no-extraneous-dependencies */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_DATE = 'latest';
const API_VERSION = '1';
const BASE_URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@${API_VERSION}/${API_DATE}`;

const initialState = {
  currencies: [],
  status: 'idle',
  error: '',
};

export const fetchCurrencies = createAsyncThunk('country/get', () => (
  new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/currencies.min.json`)
      .then(({ data }) => {
        const currencies = [];
        Object.entries(data).forEach((arr) => {
          const [key, value] = arr;
          currencies.push({
            short: key,
            name: value,
          });
        });
        resolve(currencies);
      })
      .catch((error) => {
        reject(error);
      });
  })
));

const currenciesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrencies.pending, (state) => ({
        ...state, status: 'loading',
      }))
      .addCase(fetchCurrencies.fulfilled, (state, { payload }) => ({
        ...state, currencies: payload, status: 'fulfilled',
      }))
      .addCase(fetchCurrencies.rejected, (state, { error }) => ({
        ...state, status: 'rejected', error: error.message,
      }));
  },
});

export default currenciesSlice.reducer;
