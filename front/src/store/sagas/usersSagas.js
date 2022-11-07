import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {
    loginFailure,
    loginRequest,
    loginSuccess,
    logoutRequest,
    logoutSuccess,
} from "../actions/usersActions";
import {historyPush} from "../actions/historyActions";
import {addNotification} from "../actions/notifierActions";

export function* loginUserSaga({payload: userData}) {
    try {
        const response = yield axiosApi.post('/users/sessions', userData);
        yield put(loginSuccess(response.data));
        yield put(addNotification({message: 'Login successful!', variant: 'success'}));
        yield put(historyPush('/trips'));
    } catch (e) {
        yield put(loginFailure(e.response.data));
    }
}

export function* logoutUserSaga() {
    try {
        yield axiosApi.delete('/users/sessions');
        yield put(logoutSuccess());
        yield put(addNotification({message: 'Logout successful!', variant: 'success'}));
        yield put(historyPush('/login'));
    } catch (e) {
    }
}

const userSagas = [
    takeEvery(loginRequest, loginUserSaga),
    takeEvery(logoutRequest, logoutUserSaga)
];

export default userSagas;