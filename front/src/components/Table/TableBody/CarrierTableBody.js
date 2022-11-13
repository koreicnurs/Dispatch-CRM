import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const CarrierTableBody = ({carriers, onChoose}) => {
  return (
    <>
      {carriers.map(carrier => (
        <TableRow
          key={carrier._id}
          onClick={() => onChoose(carrier._id)}
          sx={{'&:last-child td, &:last-child th': {border: 0}, background: "white",
            cursor: "pointer", ":active": {background: '#f0f2fe'}}}
        >
          <TableCell component="th" scope="row">
            {carrier.title}
          </TableCell>
          <TableCell >{carrier.mc}</TableCell>
          <TableCell >{carrier.dot}</TableCell>
          <TableCell >{carrier.fedid}</TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default CarrierTableBody;