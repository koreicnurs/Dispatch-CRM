import driversSlice from '../slices/driversSlice';

export const {
  fetchDriversRequest,
  fetchDriversSuccess,
  fetchDriversFailure,
  addDriverRequest,
  addDriverSuccess,
  addDriverFailure,
  changeModalBoolean,
  clearDriverErrors
} = driversSlice.actions;