import {put, takeEvery} from "redux-saga/effects";
import {
  createTripFailure, createTripRequest,
  createTripSuccess,
  fetchTripsFailure,
  fetchTripsRequest,
  fetchTripsSuccess
} from "../actions/tripsActions";
import {addNotification} from "../actions/notifierActions";
import axiosApi from "../../axiosApi";

export function* fetchTrips() {
  try{
    const response = yield axiosApi('/loads');
    yield put(fetchTripsSuccess(response.data));
  } catch (e) {
    yield put(fetchTripsFailure(e.response.error));
    yield put(addNotification({message: 'Trips fetch failed!', variant: 'error'}));
  }
}

export function* createTrip({payload: tripData}) {
  try {
    yield axiosApi.post('/loads', tripData);
    yield put(createTripSuccess());
    yield put(addNotification({message: 'Trip created!', variant: 'success'}));
    const response = yield axiosApi('/loads');
    yield put(fetchTripsSuccess(response.data));
  } catch (e) {
    yield put(createTripFailure(e));
    yield put(addNotification({message: 'Trip creation failed!', variant: 'error'}));
  }
}

const tripsSagas = [
  takeEvery(fetchTripsRequest, fetchTrips),
  takeEvery(createTripRequest, createTrip)
];

export default tripsSagas;