import React from 'react';
import TableCell from "@mui/material/TableCell";

const TableHeaderRow = ({headerCells, drivers, sx}) => {
  return (
    <>
      {headerCells.map(cell => (
        <TableCell
          sx={sx}
          key={Math.random() * 100}
        >
          {!drivers ? cell : cell.label}
        </TableCell>
      ))}
    </>
  );
};

export default TableHeaderRow;