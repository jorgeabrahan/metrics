/* eslint-disable import/no-extraneous-dependencies */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_DATE = 'latest';
const API_VERSION = '1';
const BASE_URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@${API_VERSION}/${API_DATE}/currencies`;

const initialState = {
  details: {},
  filteredConversions: [],
  amount: 1,
  status: 'idle',
  error: '',
};

export const fetchCurrency = createAsyncThunk('currency/get', (currency) => (
  new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/${currency}.json`)
      .then(({ data }) => {
        const details = {
          date: data.date,
          conversions: [],
        };
        Object.entries(data).forEach((arr) => {
          const [key, value] = arr;
          if (key !== 'date') {
            details.short = key;
            Object.entries(value).forEach(([currency, equivalent]) => {
              details.conversions.push({
                name: currency,
                value: equivalent,
              });
            });
          }
        });
        resolve(details);
      })
      .catch((error) => {
        reject(error);
      });
  })
));

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    clearDetails: (state) => ({
      ...state, status: 'idle', details: [], filteredConversions: [], amount: 1,
    }),
    searchForConversion: (state, { payload }) => {
      const filteredConversions = state.details.conversions.filter(({ name }) => (
        name.toLowerCase().includes(payload)
      ));

      return {
        ...state,
        filteredConversions: filteredConversions.map((c) => ({
          ...c, value: Number.parseFloat(c.value * state.amount).toFixed(2),
        })),
      };
    },
    setAmount: (state, { payload }) => ({
      ...state, amount: Number.isNaN(Number(payload)) ? 1 : Number(payload),
    }),
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrency.pending, (state) => ({
        ...state, status: 'loading',
      }))
      .addCase(fetchCurrency.fulfilled, (state, { payload }) => ({
        ...state, status: 'fulfilled', details: payload, filteredConversions: payload.conversions,
      }))
      .addCase(fetchCurrency.rejected, (state, error) => ({
        ...state, status: 'rejected', error: error.message,
      }));
  },
});

export const {
  clearDetails, searchForConversion, setAmount,
} = detailsSlice.actions;

export default detailsSlice.reducer;
