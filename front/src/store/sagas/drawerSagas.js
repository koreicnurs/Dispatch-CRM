import {takeEvery} from "redux-saga/effects";
import {handleDrawer} from "../actions/drawerActions";

export function* handleDrawerSaga({payload: isOpen}) {}

const photosSagas = [
    takeEvery(handleDrawer, handleDrawerSaga),
];

export default photosSagas;