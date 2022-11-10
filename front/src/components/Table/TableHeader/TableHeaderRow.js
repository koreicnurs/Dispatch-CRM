import React from 'react';
import TableCell from "@mui/material/TableCell";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(theme => ({
  headerTitle: {
    fontSize: "12px",
    fontWeight: "bold"
  }
}));

const TableHeaderRow = ({headerCells}) => {
  const {classes} = useStyles();
  return (
    <>
      {headerCells.map(cell => (
        <TableCell className={classes.headerTitle}>{cell}</TableCell>
      ))}
    </>
  );
};

export default TableHeaderRow;