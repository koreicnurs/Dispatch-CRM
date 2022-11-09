import carriersSlice from "../slices/carriersSlice";

export const {
  fetchCarriersRequest,
  fetchCarriersSuccess,
  fetchCarriersFailure,
  createCarrierRequest,
  createCarrierSuccess,
  createCarrierFailure
} = carriersSlice.actions;