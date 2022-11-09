import {createSlice} from "@reduxjs/toolkit";

const name = 'drivers';

const driversSlice = createSlice({
    name,
    initialState: {
        drivers: [],
        driver: null,
        loading: false,
        error: null,
    },
   reducers: {
        fetchDriversRequest(state) {
            state.loading = true;
            state.error = null;
        },
       fetchDriversSuccess(state, {payload: drivers}) {
           state.loading = false;
           state.drivers = drivers;
       },
       fetchDriversFailure(state, {payload: error}) {
           state.loading = false;
           state.error = error;
       }
   }
});

export default driversSlice;