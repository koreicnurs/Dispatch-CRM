import createSagaMiddleware from "redux-saga";
import {configureStore} from "@reduxjs/toolkit";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import axiosApi from "../axiosApi";
import {initialState} from "./slices/usersSlice";
import rootSagas from "./rootSagas";
import rootReducer from "./rootReducer";

const persistedState = loadFromLocalStorage();
const sagaMiddleware = createSagaMiddleware();
const middleware = [
    sagaMiddleware
];
const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: true,
    preloadedState: persistedState,
});

sagaMiddleware.run(rootSagas);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            ...initialState,
            user: store.getState().users.user,
        }
    })
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {
    }

    return config;
});

axiosApi.interceptors.response.use(res => res, e => {
    if (!e.response) {
        e.response = {data: {global: 'No internet!'}};
    }

    throw e;
});

export default store;