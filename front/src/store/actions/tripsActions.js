import tripsSlice from "../slices/tripsSlice";

export const {
  fetchTripsRequest,
  fetchTripsSuccess,
  fetchTripsFailure,
  createTripRequest,
  createTripSuccess,
  createTripFailure
} = tripsSlice.actions;