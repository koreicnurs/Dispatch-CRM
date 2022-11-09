import {createSlice} from '@reduxjs/toolkit';

const name = 'drivers';

const initialState = {
  drivers: [],
  driversLoading: false,
  driversError: null,
  addDriverLoading: false,
  addDriverError: null,
  modal: false,
};

const driversSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchDriversRequest(state) {
      state.driversLoading = true;
    },
    fetchDriversSuccess(state, action) {
      state.driversLoading = false;
      state.drivers = action.payload;
    },
    fetchDriversFailure(state, action) {
      state.driversLoading = false;
      state.driversError = action.payload;
    },
    addDriverRequest(state) {
      state.addDriverLoading = true;
    },
    addDriverSuccess(state) {
      state.addDriverLoading = false;
    },
    addDriverFailure(state, action) {
      state.addDriverLoading = false;
      state.addDriverError = action.payload;
    },
    clearDriverErrors(state) {
      state.addDriverError = null;
    },
  
    changeModalBoolean(state) {
      state.modal = !state.modal;
    }
  }
});

export default driversSlice;