import React from 'react';
import TripsModal from "./TripsModal";

const EditTrip = ({tripID, isEdit, limitation}) => {
  return (
    <TripsModal
      modalTitle={"Edit trip"}
      tripID={tripID}
      isEdit={isEdit}
      limitation={limitation}
    />
  );
};

export default EditTrip;