import React from 'react';
import TripsModal from "./TripsModal";

const EditTrip = ({tripID, value, limitation}) => {
  return (
    <TripsModal
      modalTitle={"Edit trip"}
      tripID={tripID}
      limitation={limitation}
      value={value}
      isEdit={true}
    />
  );
};

export default EditTrip;