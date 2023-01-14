import driversSlice from "../slices/driversSlice";

export const {
  fetchDriversRequest,
  fetchDriversSuccess,
  fetchDriversFailure,
  fetchDriversByCarrierRequest,
  fetchDriversByCarrierSuccess,
  fetchDriversByCarrierFailure,
  fetchDriverRequest,
  fetchDriverSuccess,
  fetchDriverFailure,
  addDriverRequest,
  addDriverSuccess,
  addDriverFailure,
  clearDriverErrors,
  updateDriverRequest,
  updateDriverSuccess,
  updateDriverFailure,
  updateDriverStatusRequest,
  updateDriverStatusSuccess,
  updateDriverStatusFailure
} = driversSlice.actions;