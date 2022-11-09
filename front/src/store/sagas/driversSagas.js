import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {fetchDriversFailure, fetchDriversRequest, fetchDriversSuccess} from "../actions/driversActions";
import {addNotification} from "../actions/notifierActions";

export function* fetchDrivers() {
    try{
        const response = yield axiosApi('/drivers');
        yield put(fetchDriversSuccess(response.data));
    } catch (e) {
        yield put(fetchDriversFailure(e.response.data));
        yield put(addNotification({message: 'Drivers fetch failed!', variant: 'error'}));
    }
}

const driversSaga = [
    takeEvery(fetchDriversRequest, fetchDrivers)
];

export default driversSaga;