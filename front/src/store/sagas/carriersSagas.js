import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {fetchCarriersFailure, fetchCarriersRequest, fetchCarriersSuccess} from "../actions/carriersActions";
import {addNotification} from "../actions/notifierActions";

export function* fetchCarriers() {
  try {
    const response = yield axiosApi('/carriers');
    yield put(fetchCarriersSuccess(response.data));
  } catch (e) {
    yield put(fetchCarriersFailure(e.response.data));
    yield put(addNotification({message: 'Carrier fetch failed!', variant: 'error'}));
  }
}

const carriersSaga = [
  takeEvery(fetchCarriersRequest, fetchCarriers),
];

export default carriersSaga;