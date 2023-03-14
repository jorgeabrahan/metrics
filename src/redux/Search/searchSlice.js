/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSearching: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    toggleSearch: (state) => ({
      ...state, isSearching: !state.isSearching,
    }),
  },
});

export const { toggleSearch } = searchSlice.actions;

export default searchSlice.reducer;
