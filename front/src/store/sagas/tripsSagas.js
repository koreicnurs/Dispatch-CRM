import {put, takeEvery} from "redux-saga/effects";
import {fetchTripsFailure, fetchTripsRequest, fetchTripsSuccess} from "../actions/tripsActions";
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

const tripsSagas = [
 takeEvery(fetchTripsRequest, fetchTrips)
];

export default tripsSagas;