import usersSlice from "../slices/usersSlice";

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure
} = usersSlice.actions