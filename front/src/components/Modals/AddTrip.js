import React from 'react';
import TripsModal from "./TripsModal";

const AddTrip = ({value}) => {
  return (
    <TripsModal
      modalTitle={"Add trip"}
      isAdd={value === 0}
    />
  );
};

export default AddTrip;