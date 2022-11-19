import React from 'react';
import {makeStyles} from "tss-react/mui";
import {Box, Button, Grid, Modal, TextField} from "@mui/material";
import ButtonWithProgress from "../UI/Button/ButtonWithProgress/ButtonWithProgress";
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


const ViewAll = ({open, handleClose, trip}) => {
  const {classes} = useStyles();

  return (
    trip && <div>
      <div>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >

          <Box sx={style}>

            <Grid
              container
              direction="column"
            >

              <Grid
                container
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
                    <TextField
                      name="datePU"
                      label="Loading date"
                      value={trip.datePU.substring(0, 10)}
                      className={classes.field}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item width="49.5%">
                    <TextField
                      name="dateDEL"
                      label="Arrival date"
                      value={trip.dateDEL.substring(0, 10)}
                      className={classes.field}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  <Grid item width='100%'>
                    <TextField
                      name="loadCode"
                      label="Loading Code"
                      value={trip.loadCode}
                      className={classes.field}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  <Grid
                    item
                    container
                    spacing={2}
                    justifyContent="space-between"
                  >
                    <Grid item width="49.5%">
                      <TextField
                        name="pu"
                        label="Loading location"
                        value={trip.pu}
                        className={classes.field}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>

                    <Grid item width="49.5%">
                      <TextField
                        name="del"
                        label="Unloading location"
                        value={trip.del}
                        className={classes.field}
                        InputProps={{
                          readOnly: true,
                        }}
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
                      <TextField
                        type="number"
                        name="miles"
                        label="Miles"
                        value={trip.miles}
                        className={classes.field}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>

                    <Grid item width="49.5%">
                      <TextField
                        type="number"
                        name="rpm"
                        label="Rate per mile"
                        value={trip.rpm}
                        className={classes.field}
                        InputProps={{
                          readOnly: true,
                        }}
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
                      <TextField
                        label="Status"
                        name="status"
                        value={trip.status}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>

                    <Grid item width="49.5%">
                      <TextField
                        type="number"
                        name="price"
                        label="Price"
                        value={trip.price}
                        className={classes.field}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid item width='100%'>
                    <TextField
                      label="Drivers"
                      name="driverId"
                      value={trip.driverId.name}
                    />
                  </Grid>

                  <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', margin: '12px 0 12px 10px'}}>
                    {trip && trip.RC
                      ? <ButtonWithProgress variant="contained" component="label">
                        <a href={apiUrl + trip.RC.slice(6)} target="_blank" download className={classes.link} rel="noreferrer">Download RC</a>
                      </ButtonWithProgress>
                      : null
                    }

                    {trip && trip.BOL
                      ? <ButtonWithProgress variant="contained" component="label">
                        <a href={apiUrl + trip.BOL.slice(6)} target="_blank" download className={classes.link} rel="noreferrer">Download BOL</a>
                      </ButtonWithProgress>
                      : null
                    }
                  </Box>

                  {trip && trip.comment
                    ? <Grid item width='100%'>
                        <TextField
                          name="comment"
                          label="Comment"
                          value={trip.comment}
                          multiline={true}
                          rows={2}
                          InputProps={{
                            readOnly: true,
                          }}
                          className={classes.field}
                        />
                      </Grid>
                    : null
                  }

                  <Grid item>
                    <Button variant="contained" onClick={handleClose}>
                      Close
                    </Button>

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

export default ViewAll;