import React from 'react';
import {TableCell} from "@mui/material";
import DriversModal from "./DriversModal";

const EditDriver = ({driverEmail}) => (
  <TableCell>
    <DriversModal
      modalTitle={"Edit driver"}
      driverEmail={driverEmail}
    />
  </TableCell>
);

export default EditDriver;