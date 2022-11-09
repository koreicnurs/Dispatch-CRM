import {combineReducers} from "redux";
import usersSlice from "./slices/usersSlice";
import drawerSlice from "./slices/drawerSlice";
import carriersSlice from "./slices/carriersSlice";
import driversSlice from './slices/driversSlice';

const rootReducer = combineReducers({
    users: usersSlice.reducer,
    drawer: drawerSlice.reducer,
    carriers: carriersSlice.reducer,
    drivers: driversSlice.reducer,
});

export default rootReducer;