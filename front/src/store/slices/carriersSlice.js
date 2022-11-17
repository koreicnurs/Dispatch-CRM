import {createSlice} from "@reduxjs/toolkit";

const name = 'carriers';

export const initialState = {
  carriers: [],
  carrier: null,
  loading: false,
  error: null,
  addCarrierLoading: false,
  addCarrierError: null,
  editCarrierLoading: false,
  editCarrierError: null,
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

    fetchCarrierRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCarrierSuccess(state, {payload: carrier}) {
      state.loading = false;
      state.carrier = carrier;
    },
    fetchCarrierFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createCarrierRequest(state) {
      state.addCarrierLoading = true;
      state.addCarrierError = null;
    },
    createCarrierSuccess(state) {
      state.addCarrierLoading = false;
    },
    createCarrierFailure(state, action) {
      state.addCarrierLoading = false;
      state.addCarrierError = action.payload;
    },

    editCarrierRequest(state) {
      state.editCarrierLoading = true;
      state.editCarrierError = null;
    },
    editCarrierSuccess(state) {
      state.editCarrierLoading = false;
    },
    editCarrierFailure(state, action) {
      state.editCarrierLoading = false;
      state.editCarrierError = action.payload;
    },

    clearCarriersErrors(state) {
      state.addCarrierError = null;
      state.editCarrierError = null;
    },
  }
});

export default carriersSlice;