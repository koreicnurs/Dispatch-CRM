import React from 'react';
import edit from '../../../assets/editButton.svg';
import {makeStyles} from "tss-react/mui";
import {Grid} from "@mui/material";

const useStyles = makeStyles()(theme => ({
  edit: {
    marginTop: "19px",
    marginRight: "15px",
    marginBottom: "19px",
    justifySelf: 'flex-end',
    alignSelf: 'center',
    cursor: 'pointer'
  }
}));

const EditButton = ({click}) => {
  const {classes} = useStyles();

  return (
    <Grid item onClick={click} sx={{paddingRight: "15px"}}>
      <img src={edit} className={classes.edit} alt="edit"/>
    </Grid>
  );
};

export default EditButton;