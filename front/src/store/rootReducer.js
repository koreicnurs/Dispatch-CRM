import {combineReducers} from "redux";
import usersSlice from "./slices/usersSlice";
import drawerSlice from "./slices/drawerSlice";
import carriersSlice from "./slices/carriersSlice";
import tripsSlice from "./slices/tripsSlice";
import driversSlice from "./slices/driversSlice";

const rootReducer = combineReducers({
    users: usersSlice.reducer,
    drawer: drawerSlice.reducer,
    carriers: carriersSlice.reducer,
    trips: tripsSlice.reducer,
    drivers: driversSlice.reducer,
});

export default rootReducer;