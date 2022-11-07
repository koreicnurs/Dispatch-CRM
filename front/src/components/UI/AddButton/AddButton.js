import React from 'react';
import add from '../../../assets/addButton.svg';
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import {Grid} from "@mui/material";

const useStyles = makeStyles()(theme => ({
  add: {
    marginTop: "19px",
    marginLeft: "7px",
    marginBottom: "19px"
  }
}));

const AddButton = ({newItem}) => {
  const {classes} = useStyles();

  return (
    <Grid item>
      <Link to={newItem}>
        <img src={add} className={classes.add} alt="add"/>
      </Link>
    </Grid>

  );
};

export default AddButton;