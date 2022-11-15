import React from 'react';
import {TableCell} from "@mui/material";
import DriversModal from "./DriversModal";

const EditDriver = ({driverData}) => (
  <TableCell>
    <DriversModal
      modalTitle={"Edit driver"}
      driverData={driverData}
    />
  </TableCell>
);

export default EditDriver;