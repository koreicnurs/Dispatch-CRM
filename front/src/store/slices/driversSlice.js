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
       }
   }
});

export default driversSlice;