import {combineReducers} from "redux";
import usersSlice from "./slices/usersSlice";
import drawerSlice from "./slices/drawerSlice";
import carriersSlice from "./slices/carriersSlice";

const rootReducer = combineReducers({
    users: usersSlice.reducer,
    drawer: drawerSlice.reducer,
    carriers: carriersSlice.reducer
});

export default rootReducer;