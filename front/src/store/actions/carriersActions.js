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
  editCarrierFailure,
  clearCarriersErrors,
  fetchSearchedCarriersSuccess,
  fetchSearchedCarriersRequest,
  fetchSearchedCarriersFailure
} = carriersSlice.actions;