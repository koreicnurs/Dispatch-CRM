import {createSlice} from "@reduxjs/toolkit";

const name = 'users';

export const initialState = {
    user: null,
    loginLoading: false,
    loginError: null,
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
        }
    }
});

export default usersSlice;