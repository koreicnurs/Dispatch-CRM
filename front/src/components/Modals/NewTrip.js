import React, {useEffect, useState} from 'react';
import {makeStyles} from "tss-react/mui";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Box, Button, Grid, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelect from "../UI/Form/FormSelect/FormSelect";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {fetchDriversRequest} from "../../store/actions/driversActions";
import {createTripRequest} from "../../store/actions/tripsActions";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  maxHeight: 600,
  overflow: "auto",
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '20px'
};

const useStyles = makeStyles()(theme => ({
  field: {
    background: "white",
    fontSize: "12px"
  }
}));

const statuses = ['upcoming', 'transit', 'finished'];

const regexExp = /^\d{2}[./-]\d{2}[./-]\d{4}$/;

const NewTrip = ({open, handleClose}) => {
  const {classes} = useStyles();
  const dispatch = useDispatch();
  const error = useSelector(state => state.trips.error);
  const loading = useSelector(state => state.trips.loading);
  const drivers = useSelector(state => state.drivers.drivers);
  const user = useSelector(state => state.users.user);

  useEffect(() => {
    dispatch(fetchDriversRequest());
  }, [dispatch]);

  const [dateError, setDateError] = useState();

  const [trip, setTrip] = useState({
    loadCode: "",
    driverId: "",
    dispatchId: user._id,
    price: "",
    miles: "",
    rpm: "",
    datePU: "",
    dateDEL: "",
    pu: "",
    del: "",
    status: "",
    comment: ""
  });

  const inputChangeHandler = e => {
    const {name, value} = e.target;
    setTrip(prev => ({...prev, [name]: value}));
  };

  const submitFormHandler = async e => {
    e.preventDefault();

    if (!trip.dateDEL.match(regexExp) || !trip.datePU.match(regexExp)) {
      setDateError("Does not match date format!")
    } else if(new Date(trip.datePU) > new Date(trip.dateDEL)) {
      setDateError("DEL date cannot be earlier than PU date!!")
    } else {
      const currentTrip = trip;
      currentTrip.datePU = new Date(trip.datePU).toISOString();
      currentTrip.dateDEL = new Date(trip.dateDEL).toISOString();
      console.log({...currentTrip});
      await dispatch(createTripRequest({...currentTrip}))
    }

    setTrip({
      loadCode: "",
      driverId: "",
      dispatchId: user._id,
      price: "",
      miles: "",
      rpm: "",
      datePU: "",
      dateDEL: "",
      pu: "",
      del: "",
      status: "",
      comment: ""
    });

    handleClose();
  };

  const getFieldError = (fieldName) => {
    try {
      return `${error.error} ${[fieldName]}`;
    } catch {
      return undefined;
    }
  };


  return (
    <div>
      <div>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >

          <Box sx={style}>
            <Typography id="keep-mounted-modal-description" sx={{ mb: 2 }}>
              New Load
            </Typography>

            <Grid
              container
              direction="column"
            >
              <Grid item>
                {error && (
                  <Alert severity="error">
                    Error! {error.message}
                  </Alert>
                )}
              </Grid>

              <Grid item>
                {dateError && (
                  <Alert severity="error">
                    Error! {dateError}
                  </Alert>
                )}
              </Grid>

              <Grid
                component="form"
                container
                onSubmit={submitFormHandler}
                textAlign="center"
                spacing={1}
              >
                <Grid
                  item
                  container
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Grid item width="49.5%">
                    <FormElement
                      onChange={inputChangeHandler}
                      name="datePU"
                      label="Loading date"
                      value={trip.datePU}
                      required={true}
                      error={getFieldError('datePU')}
                      className={classes.field}
                    />
                  </Grid>

                  <Grid item width="49.5%">
                    <FormElement
                      onChange={inputChangeHandler}
                      name="dateDEL"
                      label="Arrival date"
                      value={trip.dateDEL}
                      required={true}
                      error={getFieldError('dateDEL')}
                      className={classes.field}
                    />
                  </Grid>
                </Grid>

                <FormElement
                  onChange={inputChangeHandler}
                  name="loadCode"
                  label="Loading Code"
                  value={trip.loadCode}
                  required={true}
                  error={getFieldError('loadCode')}
                  className={classes.field}
                />

                <Grid
                  item
                  container
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Grid item width="49.5%">
                    <FormElement
                      onChange={inputChangeHandler}
                      name="pu"
                      label="Loading location"
                      value={trip.pu}
                      required={true}
                      error={getFieldError('pu')}
                      className={classes.field}
                    />
                  </Grid>

                  <Grid item width="49.5%">
                    <FormElement
                      onChange={inputChangeHandler}
                      name="del"
                      label="Unloading location"
                      value={trip.del}
                      required={true}
                      error={getFieldError('del')}
                      className={classes.field}
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Grid item width="49.5%">
                    <FormElement
                      onChange={inputChangeHandler}
                      type="number"
                      name="miles"
                      label="Miles"
                      value={trip.miles}
                      required={true}
                      error={getFieldError('miles')}
                      className={classes.field}
                    />
                  </Grid>

                  <Grid item width="49.5%">
                    <FormElement
                      onChange={inputChangeHandler}
                      type="number"
                      name="rpm"
                      label="Rate per mile"
                      value={trip.rpm}
                      required={true}
                      error={getFieldError('rpm')}
                      className={classes.field}
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Grid item width="49.5%">
                    <FormSelect
                      label="Status"
                      name="status"
                      array={statuses}
                      value={trip.status}
                      onChange={inputChangeHandler}
                      variant="array"
                      error={getFieldError("status")}
                    />
                  </Grid>

                  <Grid item width="49.5%">
                    <FormElement
                      onChange={inputChangeHandler}
                      type="number"
                      name="price"
                      label="Price"
                      value={trip.price}
                      required={true}
                      error={getFieldError('price')}
                      className={classes.field}
                    />
                  </Grid>
                </Grid>

                <FormSelect
                  label="Drivers"
                  name="driverId"
                  array={drivers}
                  value={trip.driverId}
                  onChange={inputChangeHandler}
                  variant="object"
                  error={getFieldError("driverId")}
                  driver={true}
                />

                <FormElement
                  onChange={inputChangeHandler}
                  name="comment"
                  label="Comment"
                  value={trip.comment}
                  multiline={true}
                  rows={2}
                  error={getFieldError('comment')}
                  className={classes.field}
                />

                <Grid item xs={12} container spacing={2} justifyContent="space-between">
                  <Grid item>
                    <Button variant="contained" onClick={handleClose}>
                      Cancel
                    </Button>

                  </Grid>

                  <Grid item>
                    <ButtonWithProgress
                      loading={loading}
                      disabled={loading}
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Create
                    </ButtonWithProgress>
                  </Grid>
                </Grid>

              </Grid>

            </Grid>

          </Box>



        </Modal>
      </div>

    </div>
  );
};

export default NewTrip;