import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {
  createCarrierFailure,
  createCarrierRequest,
  createCarrierSuccess,
  editCarrierFailure,
  editCarrierRequest,
  editCarrierSuccess,
  fetchCarrierFailure,
  fetchCarrierRequest,
  fetchCarriersFailure,
  fetchCarriersRequest,
  fetchCarriersSuccess,
  fetchCarrierSuccess
} from "../actions/carriersActions";
import {addNotification} from "../actions/notifierActions";

export function* fetchCarriers() {
  try {
    const response = yield axiosApi('/carriers');
    yield put(fetchCarriersSuccess(response.data));
  } catch (e) {
    yield put(fetchCarriersFailure(e.response.data));
    yield put(addNotification({message: 'Carriers fetch failed!', variant: 'error'}));
  }
}

export function* fetchCarrier({payload: id}) {
  try {
    const response = yield axiosApi('/carriers/' + id);
    yield put(fetchCarrierSuccess(response.data));
  } catch (e) {
    yield put(fetchCarrierFailure(e.response.data));
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

export function* editCarrier({payload}) {
  try {
    console.log(payload);
    yield axiosApi.put('/carriers/' + payload.id, payload.data);
    yield put(editCarrierSuccess());
    yield put(addNotification({message: 'Carrier is edited!', variant: 'success'}));
  } catch (e) {
    yield put(editCarrierFailure(e.response.data));
    yield put(addNotification({message: 'Carrier edit is failed!', variant: 'error'}));
  }
}

const carriersSaga = [
  takeEvery(fetchCarriersRequest, fetchCarriers),
  takeEvery(fetchCarrierRequest, fetchCarrier),
  takeEvery(createCarrierRequest, createCarrier),
  takeEvery(editCarrierRequest, editCarrier)
];

export default carriersSaga;