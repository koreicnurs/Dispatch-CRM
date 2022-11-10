import driversSlice from "../slices/driversSlice";

export const {
    fetchDriversByCarrierRequest,
    fetchDriversByCarrierSuccess,
    fetchDriversByCarrierFailure,
    fetchDriverRequest,
    fetchDriverSuccess,
    fetchDriverFailure
} = driversSlice.actions;