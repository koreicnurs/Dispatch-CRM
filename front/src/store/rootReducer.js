import {combineReducers} from "redux";
import usersSlice from "./slices/usersSlice";
import carriersSlice from "./slices/carriersSlice";
import driversSlice from './slices/driversSlice';

const rootReducer = combineReducers({
    users: usersSlice.reducer,
    carriers: carriersSlice.reducer,
    drivers: driversSlice.reducer,
});

export default rootReducer;