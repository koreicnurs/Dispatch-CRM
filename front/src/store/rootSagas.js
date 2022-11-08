import {all} from 'redux-saga/effects';
import history from '../history';
import historySagas from "./sagas/historySagas";
import notifierSagas from "./sagas/notifierSagas";
import userSagas from "./sagas/usersSagas";
import drawerSagas from "./sagas/drawerSagas";
import driversSagas from './sagas/driversSagas';

export default function* rootSagas() {
    yield all([
        ...userSagas,
        ...drawerSagas,
        ...driversSagas,
        ...historySagas(history),
        ...notifierSagas,
    ])
}