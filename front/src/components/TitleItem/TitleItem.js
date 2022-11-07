import React from 'react';
import {makeStyles} from "tss-react/mui";
import {Grid} from "@mui/material";

const useStyles = makeStyles()(theme => ({
  headerTitle: {
    width: "96px",
    height: "14px",
    paddingLeft: "30px",
    fontSize: "14px",
    fontWeight: "bold"
  }
}));

const TitleItem = ({title}) => {
  const {classes} = useStyles();

  return (
    <Grid item className={classes.headerTitle}>
      <span>
        {title}
      </span>
    </Grid>
  );
};

export default TitleItem;