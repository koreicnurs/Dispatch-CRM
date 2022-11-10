import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {
    fetchDriverFailure, fetchDriverRequest,
    fetchDriversByCarrierFailure,
    fetchDriversByCarrierRequest,
    fetchDriversByCarrierSuccess, fetchDriverSuccess
} from "../actions/driversActions";
import {addNotification} from "../actions/notifierActions";

export function* fetchDriversByCarrier({payload: id}) {
    try{
        const response = yield axiosApi('/drivers?carrier=' + id);
        yield put(fetchDriversByCarrierSuccess(response.data));
    } catch (e) {
        yield put(fetchDriversByCarrierFailure(e.response.data));
        yield put(addNotification({message: 'Drivers fetch failed!', variant: 'error'}));
    }
}

export function* fetchDriver({payload: id}) {
    try{
        const response = yield axiosApi('/drivers/' + id);
        yield put(fetchDriverSuccess(response.data));
    } catch (e) {
        yield put(fetchDriverFailure(e.response.data));
        yield put(addNotification({message: 'Driver fetch failed!', variant: 'error'}));
    }
}

const driversSaga = [
    takeEvery(fetchDriversByCarrierRequest, fetchDriversByCarrier),
    takeEvery(fetchDriverRequest, fetchDriver)
];

export default driversSaga;