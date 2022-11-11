import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {
  createCarrierFailure, createCarrierRequest,
  createCarrierSuccess,
  fetchCarriersFailure,
  fetchCarriersRequest,
  fetchCarriersSuccess
} from "../actions/carriersActions";
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

export function* createCarrier({payload: carrierData}) {
  try {
    yield axiosApi.post('/carriers', carrierData);
    yield put(createCarrierSuccess());
    yield put(addNotification({message: 'Carrier created!', variant: 'success'}));
    const response = yield axiosApi('/carriers');
    yield put(fetchCarriersSuccess(response.data));
  } catch (e) {
    yield put(createCarrierFailure(e.response.data));
    yield put(addNotification({message: 'Carrier creation failed!', variant: 'error'}));
  }
}

const carriersSaga = [
  takeEvery(fetchCarriersRequest, fetchCarriers),
  takeEvery(createCarrierRequest, createCarrier)
];

export default carriersSaga;