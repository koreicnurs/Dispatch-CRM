import React from 'react';
import {TableCell} from "@mui/material";
import CarriersModal from "./CarriersModal";

const EditCarrier = ({carrierID}) => (
  <TableCell>
    <CarriersModal
      modalTitle={"Edit carrier"}
      carrierID={carrierID}
    />
  </TableCell>
);

export default EditCarrier;