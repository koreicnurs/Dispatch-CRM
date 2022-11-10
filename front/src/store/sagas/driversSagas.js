import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {
    fetchDriversByCarrierFailure,
    fetchDriversByCarrierRequest,
    fetchDriversByCarrierSuccess
} from "../actions/driversActions";
import {addNotification} from "../actions/notifierActions";

export function* fetchDriversByCarrier() {
    try{
        const response = yield axiosApi('/drivers');
        yield put(fetchDriversByCarrierSuccess(response.data));
    } catch (e) {
        yield put(fetchDriversByCarrierFailure(e.response.data));
        yield put(addNotification({message: 'Drivers fetch failed!', variant: 'error'}));
    }
}

const driversSaga = [
    takeEvery(fetchDriversByCarrierRequest, fetchDriversByCarrier)
];

export default driversSaga;