import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditCarrier from "../../Modals/EditCarrier";

const CarrierTableBody = ({columns, carriers}) => {
  return (
    <>
      {carriers.map(carrier => (
        <TableRow
          key={carrier._id}
          sx={{
            '&:last-child td, &:last-child th': {border: 0}, background: "white",
            cursor: "pointer", ":active": {background: '#f0f2fe'}
          }}
        >
          {columns.map(column => {
            let value = carrier[column.key];
            if (column.innerKey) {
              value = value[column.innerKey];
            }
            return <TableCell sx={{fontSize: "12px"}} key={column.key + column.innerKey}>{value}</TableCell>;
          })}
          <EditCarrier carrierID={carrier._id}/>
        </TableRow>
      ))}
    </>
  );
};

export default CarrierTableBody;