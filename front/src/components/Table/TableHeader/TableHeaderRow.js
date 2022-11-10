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
        <TableCell className={classes.headerTitle} key={Math.random() * 100}>{cell}</TableCell>
      ))}
    </>
  );
};

export default TableHeaderRow;