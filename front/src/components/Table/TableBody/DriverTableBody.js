import React from 'react';
import {TableCell, TableRow} from "@mui/material";
import EditDriver from "../../Modals/EditDriver";
import ViewDocuments from "../../Modals/ViewDocuments";

const DriverTableBody = ({columns, filteredData}) => {
  return (
    <>
      {filteredData.map(driver => (
        <TableRow
          key={driver._id}
          sx={{
            '&:last-child td, &:last-child th': {border: 0}, background: "white"}}
        >
          {columns.map(column => {
            let value = driver[column.key];
            if (column.innerKey) {
              value = value[column.innerKey];
            }
            return <TableCell sx={{fontSize: "12px"}} key={column.key + column.innerKey}>{value}</TableCell>;
          })}
          <ViewDocuments license={driver.license}/>
          <EditDriver driverEmail={driver.email}/>
        </TableRow>
      ))}
    </>
  );
};

export default DriverTableBody;