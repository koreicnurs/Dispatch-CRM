import {all} from 'redux-saga/effects';
import drawerSagas from "./sagas/drawerSagas";

export default function* rootSagas() {
    yield all([
        ...drawerSagas,
    ])
}