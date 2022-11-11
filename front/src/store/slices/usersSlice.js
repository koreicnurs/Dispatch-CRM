import {createSlice} from "@reduxjs/toolkit";

const name = 'users';

export const initialState = {
    user: null,
    users: [],
    loginLoading: false,
    loginError: null,
    fetchLoading: false,
    fetchError: null
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
        }
    }
});

export default usersSlice;