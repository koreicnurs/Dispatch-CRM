import React from 'react';
import TripsModal from "./TripsModal";

const AddTrip = ({value, limitation}) => {
  return (
    <TripsModal
      modalTitle={"Add trip"}
      isAdd={value === 0}
      limitation={limitation}
    />
  );
};

export default AddTrip;