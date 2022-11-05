import createSagaMiddleware from "redux-saga";
import {configureStore} from "@reduxjs/toolkit";
import rootSagas from "./rootSagas";
import rootReducer from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();
const middleware = [
    sagaMiddleware
];
const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: true,
});

sagaMiddleware.run(rootSagas);

export default store;