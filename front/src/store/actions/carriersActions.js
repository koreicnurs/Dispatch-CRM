import carriersSlice from "../slices/carriersSlice";

export const {
  fetchCarriersRequest,
  fetchCarriersSuccess,
  fetchCarriersFailure,
  fetchCarrierRequest,
  fetchCarrierSuccess,
  fetchCarrierFailure,
  createCarrierRequest,
  createCarrierSuccess,
  createCarrierFailure,
  editCarrierRequest,
  editCarrierSuccess,
  editCarrierFailure
} = carriersSlice.actions;