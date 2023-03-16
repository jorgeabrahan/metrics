import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSearching: false,
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    toggleSearch: (state) => ({
      ...state, isSearching: !state.isSearching,
    }),
    setQuery: (state, { payload }) => ({
      ...state, query: payload,
    }),
  },
});

export const { toggleSearch, setQuery } = searchSlice.actions;

export default searchSlice.reducer;
