import {createSlice} from "@reduxjs/toolkit";

const name = 'carriers';

export const initialState = {
  carriers: [],
  loading: false,
  error: null,
};

const carriersSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchCarriersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCarriersSuccess(state, {payload: carriers}) {
      state.loading = false;
      state.carriers = carriers;
    },
    fetchCarriersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export default carriersSlice;