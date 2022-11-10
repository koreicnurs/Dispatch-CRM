import driversSlice from "../slices/driversSlice";

export const {
    fetchDriversByCarrierRequest,
    fetchDriversByCarrierSuccess,
    fetchDriversByCarrierFailure
} = driversSlice.actions;