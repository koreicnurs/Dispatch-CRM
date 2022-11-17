import React, {useEffect, useState} from 'react';
import {makeStyles} from "tss-react/mui";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Box, Button, Grid, Modal, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelect from "../UI/Form/FormSelect/FormSelect";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {fetchDriversRequest} from "../../store/actions/driversActions";
import {createTripRequest, editTripRequest} from "../../store/actions/tripsActions";
import FileInput from "../UI/Form/FileInput/FileInput";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {apiUrl} from "../../config";

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
  },
  link: {
    color: "white",
    textDecoration: "none",
  }
}));

const statuses = ['upcoming', 'transit', 'finished', 'cancel'];

const NewTrip = ({open, handleClose, editedTrip}) => {
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
    RC: "",
    BOL: "",
    comment: ""
  });

  useEffect(() => {
    if (editedTrip) {
      setStartDate(editedTrip.datePU);
      setFinDate(editedTrip.dateDEL);
      setTrip({
        loadCode: editedTrip.loadCode,
        driverId: editedTrip.driverId._id,
        dispatchId: editedTrip.dispatchId._id,
        price: +editedTrip.price,
        miles: +editedTrip.miles,
        rpm: +editedTrip.rpm,
        pu: editedTrip.pu,
        del: editedTrip.del,
        status: editedTrip.status,
        comment: editedTrip.comment || ''
      });

    }
  }, [dispatch, editedTrip]);

  const inputChangeHandler = e => {
    const {name, value} = e.target;
    setTrip(prev => ({...prev, [name]: value}));
  };

  const [startDate, setStartDate] = useState(null);
  const [finDate, setFinDate] = useState(null);

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setTrip(prevState => ({...prevState, [name]: file}));
  };

  const submitFormHandler = async e => {
    e.preventDefault();

    if(startDate > finDate) {
      setDateError("DEL date cannot be earlier than PU date!!")
    } else {
      const currentTrip = trip;
      currentTrip.datePU = startDate;
      currentTrip.dateDEL = finDate;

      const formData = new FormData();
      Object.keys(currentTrip).forEach(key => {
        formData.append(key, currentTrip[key]);
      });

      if (editedTrip) {
        await dispatch(editTripRequest({tripData: formData, id: editedTrip._id, path: editedTrip.status}));
      } else {
        await dispatch(createTripRequest(formData));
      }

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
              {editedTrip ? 'Edit Trip' : 'New Load'}
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Loading date"
                        inputFormat="MM/DD/YYYY"
                        onChange={(date) => setStartDate(date)}
                        value={startDate}
                        renderInput={(params) => <TextField {...params}/>}/>
                    </LocalizationProvider>

                  </Grid>



                  <Grid item width="49.5%">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Arrival date"
                        inputFormat="MM/DD/YYYY"
                        onChange={(date) => setFinDate(date)}
                        value={finDate}
                        renderInput={(params) => <TextField {...params}/>}/>
                    </LocalizationProvider>
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

                <Grid item>
                  <FileInput name="RC" label="RC file" onChange={fileChangeHandler} required={false}/>
                </Grid>

                <Grid item>
                  <FileInput name="BOL" label="BOL file" onChange={fileChangeHandler} required={false}/>
                </Grid>

                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', margin: '12px 0 12px 10px'}}>
                  {editedTrip && editedTrip.RC
                    ? <ButtonWithProgress variant="contained" component="label">
                        <a href={apiUrl + editedTrip.RC.slice(6)} target="_blank" download className={classes.link}>Download RC</a>
                      </ButtonWithProgress>
                    : null
                  }

                  {editedTrip && editedTrip.BOL
                    ? <ButtonWithProgress variant="contained" component="label">
                        <a href={apiUrl + editedTrip.BOL.slice(6)} target="_blank" download className={classes.link}>Download BOL</a>
                      </ButtonWithProgress>
                    : null
                  }
                </Box>



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
                      {editedTrip ? 'Save' : 'Create'}
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