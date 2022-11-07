import {combineReducers} from "redux";
import drawerSlice from "./slices/drawerSlice";

const rootReducer = combineReducers({
    drawer: drawerSlice.reducer,
});

export default rootReducer;