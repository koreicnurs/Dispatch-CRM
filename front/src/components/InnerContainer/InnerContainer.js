import React from 'react';
import {Box, Grid} from "@mui/material";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(theme => ({
  innerContainer: {
    background: '#f0f2fe',
    height: "100vh",
    paddingLeft: "15px",
    paddingBottom: "15px",
    paddingTop: "15px"
  }
}));

const InnerContainer = ({children}) => {
  const {classes} = useStyles();

  return (
    <Box className={classes.innerContainer}>
      <Grid
        container
        direction='column'
      >
        {children}
      </Grid>
    </Box>
  );
};

export default InnerContainer;