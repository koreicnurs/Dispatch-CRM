import tripsSlice from "../slices/tripsSlice";

export const {
  fetchTripsRequest,
  fetchTripsSuccess,
  fetchTripsFailure,
  createTripRequest,
  createTripSuccess,
  createTripFailure,
  changeTripStatusRequest,
  changeTripStatusSuccess,
  changeTripStatusFailure,
  cancelTripRequest,
  cancelTripSuccess,
  cancelTripFailure,
  fetchTripRequest,
  fetchTripSuccess,
  fetchTripFailure,
  editTripRequest,
  editTripSuccess,
  editTripFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
  addAttachmentRequest,
  addAttachmentSuccess,
  addAttachmentFailure,
  clearCreateTripErrorRequest
} = tripsSlice.actions;