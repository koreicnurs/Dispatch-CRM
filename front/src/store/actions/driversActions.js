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
  changeModalBoolean,
  clearDriverErrors,
    updateDriverRequest,
    updateDriverSuccess,
    updateDriverFailure
} = driversSlice.actions;