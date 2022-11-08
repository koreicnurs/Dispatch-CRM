import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {historyPush} from '../actions/historyActions';
import {addNotification} from '../actions/notifierActions';
import {
  fetchDriversRequest,
  fetchDriversSuccess,
  fetchDriversFailure,
  addDriverRequest,
  addDriverSuccess,
  addDriverFailure
} from '../actions/driversActions';

export function* getDrivers() {
  try {
    const response = yield axiosApi('/drivers');
    yield put(fetchDriversSuccess(response.data));
  } catch (e) {
    yield put(fetchDriversFailure(e.response && e.response.data));
  }
}

export function* addDriver(action) {
  try {
    yield axiosApi.post('/drivers', action.payload);
    yield put(addDriverSuccess());
  
    yield put(addNotification({message: 'You have successfully added a driver!', variant: 'success'}));
    yield put(historyPush('/drivers'));
  } catch (e) {
    yield put(addDriverFailure(e.response && e.response.data));
  }
}

const driversSagas = [
  takeEvery(fetchDriversRequest, getDrivers),
  takeEvery(addDriverRequest, addDriver),
];

export default driversSagas;