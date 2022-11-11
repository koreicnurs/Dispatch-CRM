import {createSlice} from "@reduxjs/toolkit";

const name = 'drivers';

const driversSlice = createSlice({
    name,
    initialState: {
        driversByCarrier: [],
        driver: null,
        loading: false,
        error: null,
    },
   reducers: {
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
   }
});

export default driversSlice;