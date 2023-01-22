import React from 'react';
import TripsModal from "./TripsModal";

const EditTrip = ({tripID, isEdit}) => {
  return (
    <TripsModal
      modalTitle={"Edit trip"}
      tripID={tripID}
      // isEdit={true}
    />
  );
};

export default EditTrip;