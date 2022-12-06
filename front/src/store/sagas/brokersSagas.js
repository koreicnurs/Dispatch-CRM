import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {
    createBrokerFailure,
    createBrokerRequest,
    createBrokerSuccess,
    deleteBrokerFailure,
    deleteBrokerRequest,
    deleteBrokerSuccess,
    editBrokerFailure,
    editBrokerRequest,
    editBrokerSuccess,
    fetchBrokerFailure,
    fetchBrokerRequest,
    fetchBrokersFailure,
    fetchBrokersRequest,
    fetchBrokersSuccess,
    fetchBrokerSuccess
} from "../actions/brokersActions";
import {addNotification} from "../actions/notifierActions";

export function* fetchBrokers() {
    try {
        const response = yield axiosApi('/brokers');
        yield put(fetchBrokersSuccess(response.data));
    } catch (e) {
        yield put(fetchBrokersFailure(e.response.data));
        yield put(addNotification({message: 'Brokers fetch failed!', variant: 'error'}));
    }
}

export function* fetchBroker({payload: id}) {
    try {
        const response = yield axiosApi('/brokers/' + id);
        yield put(fetchBrokerSuccess(response.data));
    } catch (e) {
        yield put(fetchBrokerFailure(e.response.data));
        yield put(addNotification({message: 'Broker fetch failed!', variant: 'error'}));
    }
}

export function* createBroker({payload: brokerData}) {
    try {
        yield axiosApi.post('/brokers', brokerData);
        yield put(createBrokerSuccess());
        yield put(addNotification({message: 'Broker created!', variant: 'success'}));
        yield put(fetchBrokersRequest());
    } catch (e) {
        yield put(createBrokerFailure(e.response.data));
        yield put(addNotification({message: 'Broker creation failed!', variant: 'error'}));
    }
}

export function* editBroker({payload}) {
    try {
        yield axiosApi.put('/brokers/' + payload.id, payload.data);
        yield put(editBrokerSuccess());
        yield put(fetchBrokersRequest());
        yield put(addNotification({message: 'You have successfully edited a broker!', variant: 'success'}));
    } catch (e) {
        yield put(editBrokerFailure(e.response.data));
        yield put(addNotification({message: 'Broker edit is failed!', variant: 'error'}));
    }
}

export function* deleteBroker({payload: id}) {
    try {
        yield axiosApi.delete('/brokers/' + id);
        yield put(deleteBrokerSuccess());
        yield put(addNotification({message: 'You have successfully deleted a broker!', variant: 'success'}));
    } catch (e) {
        yield put(deleteBrokerFailure(e.response.data));
        yield put(addNotification({message: 'Broker delete failed!', variant: 'error'}));
    }
}

const brokersSaga = [
    takeEvery(fetchBrokersRequest, fetchBrokers),
    takeEvery(fetchBrokerRequest, fetchBroker),
    takeEvery(createBrokerRequest, createBroker),
    takeEvery(editBrokerRequest, editBroker),
    takeEvery(deleteBrokerRequest, deleteBroker),
];

export default brokersSaga;