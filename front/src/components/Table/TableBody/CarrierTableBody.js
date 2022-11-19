import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditCarrier from "../../Modals/EditCarrier";

const CarrierTableBody = ({carriers}) => {
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
          <TableCell component="th" scope="row" sx={{fontSize: "12px"}}>
            {carrier.title}
          </TableCell>
          <TableCell sx={{fontSize: "12px"}}>{carrier.mc}</TableCell>
          <TableCell sx={{fontSize: "12px"}}>{carrier.dot}</TableCell>
          <TableCell sx={{fontSize: "12px"}}>{carrier.fedid}</TableCell>
          <EditCarrier carrier={carrier}/>
        </TableRow>
      ))}
    </>
  );
};

export default CarrierTableBody;