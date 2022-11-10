import {put, takeEvery} from "redux-saga/effects";
import {fetchCTripsFailure, fetchCTripsSuccess} from "../actions/tripsActions";
import {addNotification} from "../actions/notifierActions";
import axiosApi from "../../axiosApi";
import {fetchCarriersRequest} from "../actions/carriersActions";

export function* fetchTrips() {
  try{
    const response = yield axiosApi('/loads');
    yield put(fetchCTripsSuccess(response.data));
  } catch (e) {
    yield put(fetchCTripsFailure(e.response.error));
    yield put(addNotification({message: 'Trips fetch failed!', variant: 'error'}));
  }
}

const tripsSagas = [
 takeEvery(fetchCarriersRequest, fetchTrips)
];

export default tripsSagas;