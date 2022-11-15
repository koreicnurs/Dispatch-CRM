import React from 'react';
import {TableCell, TableRow} from "@mui/material";

const DriverTableBody = ({columns, drivers}) => {
  return (
    <>
      {drivers.map(driver => (
        <TableRow
          key={driver._id}
          sx={{'&:last-child td, &:last-child th': {border: 0}, background: "white",
            cursor: "pointer", ":active": {background: '#f0f2fe'}}}
        >
          {columns.map(column => {
            let value = driver[column.key];
            if (column.innerKey) {
              value = value[column.innerKey];
            }
            return <TableCell sx={{fontSize: "12px"}} key={column.key + column.innerKey}>{value}</TableCell>;
          })}
        </TableRow>
      ))}
    </>
  );
};

export default DriverTableBody;