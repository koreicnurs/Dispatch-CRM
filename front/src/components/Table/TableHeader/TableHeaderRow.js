import React from 'react';
import TableCell from "@mui/material/TableCell";


const TableHeaderRow = ({headerCells, data, sx}) => {
  return (
    <>
      {headerCells.map(cell => (
        <TableCell
          sx={sx}
          key={Math.random() * 100}
          >
            {!data ? cell : cell.label}
        </TableCell>
      ))}
    </>
  );
};

export default TableHeaderRow;