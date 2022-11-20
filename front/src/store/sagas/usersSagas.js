import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {
    changeDispatcherFailure, changeDispatcherRequest, changeDispatcherSuccess,
    changeUserFailure, changeUserRequest, changeUserSuccess,
    fetchUsersFailure, fetchUsersRequest,
    fetchUsersSuccess,
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
        yield put(addNotification({message: 'Successfully log in!', variant: 'success'}));
        yield put(historyPush('/trips'));
    } catch (e) {
        yield put(loginFailure(e.response.data));
    }
}

export function* logoutUserSaga() {
    try {
        yield axiosApi.delete('/users/sessions');
        yield put(logoutSuccess());
        yield put(historyPush('/login'));
    } catch (e) {
    }
}

export function* fetchUsers() {
    try {
        const response = yield axiosApi('/users');
        yield put(fetchUsersSuccess(response.data));
    } catch (e) {
        yield put(fetchUsersFailure(e.response.data));
    }
}

export function* changeUserData({payload: userData}) {
    try {
        const response = yield axiosApi.put('/users', userData);
        yield put(changeUserSuccess(response.data));
        yield put(addNotification({message: 'Successfully changed!', variant: 'success'}));

    } catch (e) {
        yield put(addNotification({message: 'Changing failed!', variant: 'error'}))
        yield put(changeUserFailure(e.response.data));
    }
}

export function* changeDispatcherData({payload: dispatcherData}) {
    try {
        yield axiosApi.put('/users/change_dispatcher', dispatcherData);
        yield put(changeDispatcherSuccess());
        yield put(addNotification({message: 'Successfully changed!', variant: 'success'}));
        // const response = yield axiosApi('/users');
        // yield put(fetchUsersSuccess(response.data));
    } catch (e) {
        yield put(addNotification({message: 'Changing failed!', variant: 'error'}));
        yield put(changeDispatcherFailure(e.response.data));
    }
}

const userSagas = [
    takeEvery(loginRequest, loginUserSaga),
    takeEvery(logoutRequest, logoutUserSaga),
    takeEvery(fetchUsersRequest, fetchUsers),
    takeEvery(changeUserRequest, changeUserData),
    takeEvery(changeDispatcherRequest, changeDispatcherData)
];

export default userSagas;