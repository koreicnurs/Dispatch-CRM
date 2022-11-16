import {createSlice} from "@reduxjs/toolkit";

const name = 'carriers';

export const initialState = {
  carriers: [],
  carrier: null,
  loading: false,
  error: null,
  editModal: false,
  newModal: false,
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
      state.loading = true;
      state.error = null;
    },
    createCarrierSuccess(state) {
      state.loading = false;
    },
    createCarrierFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    editCarrierRequest(state) {
      state.loading = true;
      state.error = null;
    },
    editCarrierSuccess(state) {
      state.loading = false;
    },
    editCarrierFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    changeEditModal(state) {
      state.editModal = !state.editModal;
    },
    changeNewModal(state) {
      state.newModal = !state.newModal;
    },
  }
});

export default carriersSlice;