import driversSlice from '../slices/driversSlice';

export const {
  fetchDriversRequest,
  fetchDriversSuccess,
  fetchDriversFailure,
  addDriverRequest,
  addDriverSuccess,
  addDriverFailure
} = driversSlice.actions;