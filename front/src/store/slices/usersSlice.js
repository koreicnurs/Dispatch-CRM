import {createSlice} from "@reduxjs/toolkit";

const name = 'users';

export const initialState = {
    user: null,
    users: [],
    loginLoading: false,
    loginError: null,
    fetchLoading: false,
    fetchError: null,
    changeLoading: false,
    changeError: null,
    createLoading: false,
    createError: null
};

const usersSlice = createSlice({
    name,
    initialState,
    reducers: {
        loginRequest(state) {
            state.loginLoading = true;
            state.loginError = null;
        },
        loginSuccess(state, {payload: user}) {
            state.loginLoading = false;
            state.user = user;
        },
        loginFailure(state, action) {
            state.loginLoading = false;
            state.loginError = action.payload;
        },
        logoutRequest() {},
        logoutSuccess(state) {
            state.user = null;
        },

        fetchUsersRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchUsersSuccess(state, {payload: users}) {
            state.users = users;
            state.fetchLoading = false;
        },
        fetchUsersFailure(state, action) {
            state.loadingError = action.payload;
            state.fetchLoading = false;
        },

        changeUserRequest(state) {
            state.changeLoading = true;
            state.changeError = null;
        },
        changeUserSuccess(state, {payload: user}) {
            state.changeLoading = false;
            state.user = user;
        },
        changeUserFailure(state, action) {
            state.changeLoading =false;
            state.changeError = action.payload;
        },

        changeDispatcherRequest(state) {
            state.changeLoading = true;
            state.changeError = null;
        },
        changeDispatcherSuccess(state) {
            state.changeLoading = false;
        },
        changeDispatcherFailure(state, action) {
            state.changeLoading =false;
            state.changeError = action.payload;
        },

        createDispatcherRequest(state) {
            state.createLoading = true;
            state.createError = null;
        },
        createDispatcherSuccess(state) {
            state.createLoading = false;
        },
        createDispatcherFailure(state, action) {
            state.createLoading =false;
            state.createError = action.payload;
        },
    }
});

export default usersSlice;