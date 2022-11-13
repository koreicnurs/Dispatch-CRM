import {createSlice} from "@reduxjs/toolkit";

const name = 'drivers';

const driversSlice = createSlice({
    name,
    initialState: {
        drivers: [],
        driversByCarrier: [],
        driver: null,
        loading: false,
        error: null,
        driversLoading: false,
        driversError: null,
        addDriverLoading: false,
        addDriverError: null,
        modal: false,
    },
    reducers: {
        fetchDriversRequest(state) {
            state.driversLoading = true;
        },
        fetchDriversSuccess(state, action) {
            state.driversLoading = false;
            state.drivers = action.payload;
        },
        fetchDriversFailure(state, action) {
            state.driversLoading = false;
            state.driversError = action.payload;
        },

        fetchDriversByCarrierRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchDriversByCarrierSuccess(state, {payload: drivers}) {
            state.loading = false;
            state.driversByCarrier = drivers;
        },
        fetchDriversByCarrierFailure(state, {payload: error}) {
            state.loading = false;
            state.error = error;
        },

        fetchDriverRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchDriverSuccess(state, {payload: driver}) {
            state.loading = false;
            state.driver = driver;
        },
        fetchDriverFailure(state, {payload: error}) {
            state.loading = false;
            state.error = error;
        },

        addDriverRequest(state) {
            state.addDriverLoading = true;
        },
        addDriverSuccess(state) {
            state.addDriverLoading = false;
        },
        addDriverFailure(state, action) {
            state.addDriverLoading = false;
            state.addDriverError = action.payload;
        },

        updateDriverRequest(state) {
            state.loading = true;
            state.error = null;
        },
        updateDriverSuccess(state) {
            state.loading = false;
        },
        updateDriverFailure(state, {payload: error}) {
            state.loading = false;
            state.error = error;
        },

        clearDriverErrors(state) {
            state.addDriverError = null;
        },

        changeModalBoolean(state) {
            state.modal = !state.modal;
        }
    }
});

export default driversSlice;