import React, {useState} from 'react';
import {makeStyles} from "tss-react/mui";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";

const useStyles = makeStyles()(theme => ({
  innerContainer: {
    background: '#D9D9D9',
    height: "100vh",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingBottom: "15px",
    paddingTop: "15px"
  },
  field: {
    background: "white"
  }
}));

const NewCarrier = () => {
  const {classes} = useStyles();

  const dispatch = useDispatch();
  const error = useSelector(state => state.carriers.error);
  const loading = useSelector(state => state.carriers.loading);

  const [carrier, setCarrier] = useState({
    title: '',
    mc: '',
    dot: '',
    fedid: ''
  });

  const inputChangeHandler = e => {
    const {name, value} = e.target;
    setCarrier(prev => ({...prev, [name]: value}));
  };

  const submitFormHandler = e => {
    e.preventDefault();

  };

  const getFieldError = fieldName => {
    try {
      return `${error.error} ${[fieldName]}`;
    } catch {
      return undefined;
    }
  };

  return (
    <Grid
      container
      direction="column"
      className={classes.innerContainer}
    >
      <Grid item marginY="15px">
        <Typography variant="h5">
          Add new carrier
        </Typography>
      </Grid>

      {error && (
        <Alert severity="error">
          Error! {error.message}
        </Alert>
      )}

      <Grid
        component="form"
        item
        container
        onSubmit={submitFormHandler}
        textAlign="center"
        spacing={2}
      >
        <FormElement
          onChange={inputChangeHandler}
          name="title"
          label="Company name"
          value={carrier.title}
          required={true}
          error={getFieldError('title')}
          className={classes.field}
        />

        <FormElement
          onChange={inputChangeHandler}
          name="mc"
          label="MC"
          value={carrier.mc}
          required={true}
          error={getFieldError('mc')}
          className={classes.field}
        />

        <FormElement
          onChange={inputChangeHandler}
          name="dot"
          label="DOT"
          value={carrier.dot}
          required={true}
          error={getFieldError('dot')}
          className={classes.field}
        />

        <FormElement
          onChange={inputChangeHandler}
          name="fedid"
          label="FED-ID"
          value={carrier.fedid}
          required={true}
          error={getFieldError('fedid')}
          className={classes.field}
        />

        <Grid item xs={12}>
          <ButtonWithProgress
            loading={loading}
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </ButtonWithProgress>
        </Grid>

      </Grid>

    </Grid>
  );
};

export default NewCarrier;