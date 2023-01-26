import React from 'react';
import TripsModal from "./TripsModal";

const AddTrip = ({value, limitation}) => {
  return (
    <TripsModal
      modalTitle={"Add trip"}
      limitation={limitation}
      isAdd={true}
      isButton={value === 0}
    />
  );
};

export default AddTrip;