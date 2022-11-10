import React, {useState} from 'react';
import {makeStyles} from "tss-react/mui";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Box, Button, Grid, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelect from "../UI/Form/FormSelect/FormSelect";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '20px'
};

const useStyles = makeStyles()(theme => ({
  field: {
    background: "white"
  }
}));

const regexExp = /^\d{2}[./-]\d{2}[./-]\d{4}$/;

const NewTrip = ({open, handleClose}) => {
  const {classes} = useStyles();
  const dispatch = useDispatch();
  const error = useSelector(state => state.trips.error);
  const loading = useSelector(state => state.trips.loading);
  const drivers = useSelector(state => state.drivers.drivers);

  const [trip, setTrip] = useState({
    loadCode: "",
    driverId: "",
    dispatchId: "",
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

  const inputChangeHandler = () => {};

  const submitFormHandler = () => {};

  const getFieldError = () => {};


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

              <Grid
                component="form"
                container
                onSubmit={submitFormHandler}
                textAlign="center"
                spacing={1}
              >
                <FormElement
                  onChange={inputChangeHandler}
                  name="datePU"
                  label="Loading date"
                  value={trip.datePU}
                  required={true}
                  error={getFieldError('datePU')}
                  className={classes.field}
                />

                <FormElement
                  onChange={inputChangeHandler}
                  name="dateDEL"
                  label="Arrival date"
                  value={trip.dateDEL}
                  required={true}
                  error={getFieldError('dateDEL')}
                  className={classes.field}
                />

                <FormElement
                  onChange={inputChangeHandler}
                  name="loadCode"
                  label="Loading Code"
                  value={trip.loadCode}
                  required={true}
                  error={getFieldError('loadCode')}
                  className={classes.field}
                />

                <FormElement
                  onChange={inputChangeHandler}
                  name="pu"
                  label="Loading location"
                  value={trip.pu}
                  required={true}
                  error={getFieldError('pu')}
                  className={classes.field}
                />

                <FormElement
                  onChange={inputChangeHandler}
                  name="del"
                  label="Unloading location"
                  value={trip.del}
                  required={true}
                  error={getFieldError('del')}
                  className={classes.field}
                />

                <FormElement
                  onChange={inputChangeHandler}
                  name="rpm"
                  label="Rate per mile"
                  value={trip.rpm}
                  required={true}
                  error={getFieldError('rpm')}
                  className={classes.field}
                />

                <FormElement
                  onChange={inputChangeHandler}
                  name="miles"
                  label="Miles"
                  value={trip.miles}
                  required={true}
                  error={getFieldError('miles')}
                  className={classes.field}
                />

                <FormSelect
                  label="Drivers"
                  name="driverId"
                  array={drivers}
                  value={trip.driverId}
                  onChange={inputChangeHandler}
                  variant="object"
                  error={getFieldError("driverId")}
                />

                <FormElement
                  onChange={inputChangeHandler}
                  name="dispatchId"
                  label="Dispatch"
                  value={trip.dispatchId}
                  required={true}
                  error={getFieldError('dispatchId')}
                  className={classes.field}
                />

                <Grid item xs={12} container spacing={2} justifyContent="space-between">
                  <Grid item>
                    <Button>
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