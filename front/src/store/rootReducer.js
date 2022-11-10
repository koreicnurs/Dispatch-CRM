import {combineReducers} from "redux";
import usersSlice from "./slices/usersSlice";
import drawerSlice from "./slices/drawerSlice";
import carriersSlice from "./slices/carriersSlice";
import tripsSlice from "./slices/tripsSlice";

const rootReducer = combineReducers({
    users: usersSlice.reducer,
    drawer: drawerSlice.reducer,
    carriers: carriersSlice.reducer,
    trips: tripsSlice.reducer
});

export default rootReducer;