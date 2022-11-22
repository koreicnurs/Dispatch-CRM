import React, {useEffect, useState} from 'react';
import {makeStyles} from "tss-react/mui";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Box, Button, FormHelperText, Grid, Modal, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelect from "../UI/Form/FormSelect/FormSelect";
import ButtonWithProgress from "../UI/Button/ButtonWithProgress/ButtonWithProgress";
import {fetchDriversRequest} from "../../store/actions/driversActions";
import {clearCreateTripErrorRequest, createTripRequest, editTripRequest} from "../../store/actions/tripsActions";
import FileInput from "../UI/Form/FileInput/FileInput";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {DesktopTimePicker} from '@mui/x-date-pickers/DesktopTimePicker';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {apiUrl} from "../../config";
import dayjs from 'dayjs';

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

const NewTrip = ({open, handleClose, editedTrip, trips}) => {
  const {classes} = useStyles();
  const dispatch = useDispatch();
  const createError = useSelector(state => state.trips.createTripError);
  const editError = useSelector(state => state.trips.editTripError);
  const loading = useSelector(state => state.trips.loading);
  const drivers = useSelector(state => state.drivers.drivers);
  const user = useSelector(state => state.users.user);

  useEffect(() => {
    dispatch(fetchDriversRequest());
  }, [dispatch]);
  
  useEffect(() => {
    if (editError === null) {
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
        comment: "",
        RC: "",
        BOL: "",
      });
  
      clearCreateTripErrorRequest();
      handleCloseHandler();
    }
    if (createError === null) {
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
        comment: "",
        RC: "",
        BOL: "",
      });
  
      clearCreateTripErrorRequest();
      handleCloseHandler();
    }
    setStartDate(null);
    setFinDate(null);
    setTimeToPUValue(null);
    setTimeToDelValue(null);
    // eslint-disable-next-line
  }, [trips]);

  const [timeToPUValue, setTimeToPUValue] = useState(null);
  const [timeToDelValue, setTimeToDelValue] = useState(null);

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
    comment: "",
    timeToPU: "",
    timeToDel: ""
  });

  useEffect(() => {
    if (editedTrip) {
      setStartDate(editedTrip.datePU);
      setFinDate(editedTrip.dateDEL);
      setTimeToPUValue(dayjs(new Date(`${editedTrip.datePU} ${editedTrip.timeToPU}`).toUTCString()));
      setTimeToDelValue(dayjs(new Date(`${editedTrip.dateDEL} ${editedTrip.timeToDel}`).toUTCString()));
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
        comment: editedTrip.comment || '',
        timeToPU: dayjs(new Date(`${editedTrip.datePU} ${editedTrip.timeToPU}`).toUTCString()),
        timeToDel: dayjs(new Date(`${editedTrip.dateDEL} ${editedTrip.timeToDel}`).toUTCString())
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
  
    const currentTrip = trip;
    currentTrip.datePU = startDate;
    currentTrip.dateDEL = finDate;
    currentTrip.timeToPU = timeToPUValue.$H + ':' + timeToPUValue.$m;
    currentTrip.timeToDel = timeToDelValue.$H + ':' + timeToDelValue.$m;

    const formData = new FormData();
    Object.keys(currentTrip).forEach(key => {
      formData.append(key, currentTrip[key]);
    });
  
    if (editedTrip) {
      await dispatch(editTripRequest({tripData: formData, id: editedTrip._id, path: editedTrip.status}));
    } else {
      await dispatch(createTripRequest(formData));
    }
  };

  const getFieldError = (fieldName) => {
    try {
      if(createError) {
        return createError.errors[fieldName].message;
      } else if(editError) {
        return editError.errors[fieldName].message;
      }
    } catch {
      return undefined;
    }
  };
  
  const handleCloseHandler = async () => {
    await dispatch(clearCreateTripErrorRequest());
    handleClose();
  };
  
  return (
    <div>
      <div>
        <Modal
          keepMounted
          open={open}
          onClose={handleCloseHandler}
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
              <Grid item mb={2}>
                {(editError && Object.keys(editError).length === 1) && (
                  <Alert severity="error">
                    Error! {editError.message}
                  </Alert>
                )}
              </Grid>
  
              <Grid item mb={2}>
                {(createError && Object.keys(createError).length === 1) && (
                  <Alert severity="error">
                    Error! {createError.message}
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
                        renderInput={(params) => <TextField {...params} required={true}/>}/>
                    </LocalizationProvider>

                  </Grid>

                  <Grid item width="49.5%">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Arrival date"
                        inputFormat="MM/DD/YYYY"
                        onChange={(date) => setFinDate(date)}
                        value={finDate}
                        renderInput={(params) => <TextField {...params} required={true}/>}/>
                    </LocalizationProvider>
                  </Grid>
                </Grid>
  
                <Grid
                  item
                  container
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Grid item width="49.5%">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopTimePicker
                        label="Loading time"
                        value={timeToPUValue}
                        onChange={(newValue) => setTimeToPUValue(newValue)}
                        renderInput={(params) => <TextField {...params} required={true}/>}
                      />
                      <FormHelperText sx={{
                        color: '#d32f2f',
                        margin: '3px 14px 0'
                      }}>{getFieldError('timeToPU')}</FormHelperText>
                    </LocalizationProvider>
                  </Grid>
  
                  <Grid item width="49.5%">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopTimePicker
                        label="Arrival time"
                        value={timeToDelValue}
                        onChange={(newValue) => setTimeToDelValue(newValue)}
                        renderInput={(params) => <TextField {...params} required={true}/>}
                      />
                      <FormHelperText sx={{
                        color: '#d32f2f',
                        margin: '3px 14px 0'
                      }}>{getFieldError('timeToDel')}</FormHelperText>
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
                      inputProps={{min:0, step: '0.01'}}
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
                      inputProps={{min:0, step: '0.01'}}
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
                  {editedTrip ?
                    <Grid item width="49.5%">
                      <FormSelect
                        label="Status"
                        name="status"
                        array={statuses}
                        value={trip.status}
                        required={true}
                        onChange={inputChangeHandler}
                        variant="array"
                        error={getFieldError("status")}
                      />
                    </Grid> : null
                  }

                  <Grid item width={editedTrip ? "49.5%" : "100%"}>
                    <FormElement
                      onChange={inputChangeHandler}
                      type="number"
                      name="price"
                      label="Price"
                      inputProps={{min:0, step: '0.01'}}
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
                  required={true}
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
                        <a href={apiUrl + editedTrip.RC.slice(6)} target="_blank" download className={classes.link} rel="noreferrer">Download RC</a>
                      </ButtonWithProgress>
                    : null
                  }

                  {editedTrip && editedTrip.BOL
                    ? <ButtonWithProgress variant="contained" component="label">
                        <a href={apiUrl + editedTrip.BOL.slice(6)} target="_blank" download className={classes.link} rel="noreferrer">Download BOL</a>
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
                  required={false}
                  rows={2}
                  error={getFieldError('comment')}
                  className={classes.field}
                />

                <Grid item xs={12} container spacing={2} justifyContent="space-between">
                  <Grid item>
                    <Button variant="contained" onClick={handleCloseHandler}>
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