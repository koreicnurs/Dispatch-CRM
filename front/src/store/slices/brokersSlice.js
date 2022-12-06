import {createSlice} from "@reduxjs/toolkit";

const name = 'brokers';

export const initialState = {
    brokers: [],
    broker: null,
    loading: false,
    error: null,
    addBrokerLoading: false,
    addBrokerError: null,
    editBrokerLoading: false,
    editBrokerError: null,
};

const brokersSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchBrokersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchBrokersSuccess(state, {payload: brokers}) {
            state.loading = false;
            state.brokers = brokers;
        },
        fetchBrokersFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        fetchBrokerRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchBrokerSuccess(state, {payload: broker}) {
            state.loading = false;
            state.broker = broker;
        },
        fetchBrokerFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        createBrokerRequest(state) {
            state.addBrokerLoading = true;
            state.addBrokerError = null;
        },
        createBrokerSuccess(state) {
            state.addBrokerLoading = false;
        },
        createBrokerFailure(state, action) {
            state.addBrokerLoading = false;
            state.addBrokerError = action.payload;
        },

        editBrokerRequest(state) {
            state.editBrokerLoading = true;
            state.editBrokerError = null;
        },
        editBrokerSuccess(state) {
            state.editBrokerLoading = false;
        },
        editBrokerFailure(state, action) {
            state.editBrokerLoading = false;
            state.editBrokerError = action.payload;
        },

        deleteBrokerRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteBrokerSuccess(state) {
            state.loading = false;
        },
        deleteBrokerFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        clearBrokersErrors(state) {
            state.addBrokerError = null;
            state.editBrokerError = null;
        },
    }
});

export default brokersSlice;