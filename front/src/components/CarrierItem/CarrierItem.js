import React from 'react';
import {Grid} from "@mui/material";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(theme => ({
  cell: {
    width: "150px",
    paddingLeft: "30px",
    fontSize: "14px",
    paddingBottom: "16px"
  },
  row: {
    background: "white"
  }
}));

const CarrierItem = ({carrier}) => {
  const {classes} = useStyles();

  return (
    <Grid
      item
      container
      spacing={2}
      className={classes.row}
      marginTop="5px"
    >
      {Object.keys(carrier).map((key) => {
        if (key !== "_id" && key !== "description" && key !== "__v") {
          return (
            <Grid item className={classes.cell} key={carrier[key]}>
              <span>
                {carrier[key]}
              </span>
            </Grid>
          )
        }
        return null;
      })}
    </Grid>
  );
};

export default CarrierItem;