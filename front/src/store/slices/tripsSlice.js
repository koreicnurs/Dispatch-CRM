import {createSlice} from "@reduxjs/toolkit";

const name = 'trips';

export const initialState = {
  trips: [],
  loading: false,
  error: null,
};

const tripsSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchTripsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTripsSuccess(state, {payload: trips}) {
      state.loading = false;
      state.trips = trips;
    },
    fetchTripsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createTripRequest(state) {
      state.loading = true;
      state.error = null;
    },
    createTripSuccess(state) {
      state.loading = false;
    },
    createTripFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export default tripsSlice;