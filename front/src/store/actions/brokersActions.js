import brokersSlice from "../slices/brokersSlice";

export const {
    fetchBrokersRequest,
    fetchBrokersSuccess,
    fetchBrokersFailure,
    fetchBrokerRequest,
    fetchBrokerSuccess,
    fetchBrokerFailure,
    createBrokerRequest,
    createBrokerSuccess,
    createBrokerFailure,
    editBrokerRequest,
    editBrokerSuccess,
    editBrokerFailure,
    deleteBrokerRequest,
    deleteBrokerSuccess,
    deleteBrokerFailure,
    clearBrokersErrors,
} = brokersSlice.actions;