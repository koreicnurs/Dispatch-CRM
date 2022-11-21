import React from 'react';
import TableCell from "@mui/material/TableCell";

const TableHeaderRow = ({headerCells, drivers}) => {
  return (
    <>
      {headerCells.map(cell => (
        <TableCell
          sx={{fontSize: "12px", fontWeight: "bold"}}
          key={Math.random() * 100}
        >
          {!drivers ? cell : cell.label}
        </TableCell>
      ))}
    </>
  );
};

export default TableHeaderRow;