import React, {useEffect, useState} from 'react';
import {Alert, Box, Grid, Modal, TableCell} from "@mui/material";
import Typography from "@mui/material/Typography";
import {makeStyles} from "tss-react/mui";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../UI/Button/ButtonWithProgress/ButtonWithProgress";
import {editCarrierRequest, fetchCarriersRequest} from "../../store/actions/carriersActions";
import EditButton from "../UI/Button/EditButton/EditButton";

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

const useStyles = makeStyles()(() => ({
  field: {
    background: "white"
  }
}));

const EditCarrier = ({carrier}) => {
  const {classes} = useStyles();

  const dispatch = useDispatch();
  const error = useSelector(state => state.carriers.error);
  const loading = useSelector(state => state.carriers.loading);

  const [modal, setModal] = useState(false);

  const [carrierData, setCarrierData] = useState({
    title: '',
    mc: '',
    dot: '',
    fedid: '',
    description: ''
  });

  useEffect(() => {
    setCarrierData(carrier);
  }, [carrier]);

  const inputChangeHandler = e => {
    const {name, value} = e.target;
    setCarrierData(prev => ({...prev, [name]: value}));
  };

  const submitFormHandler = async e => {
    e.preventDefault();
    await dispatch(editCarrierRequest({id: carrier._id, data: {...carrierData}}));

    setCarrierData({
      title: '',
      mc: '',
      dot: '',
      fedid: '',
      description: ''
    });
    await dispatch(fetchCarriersRequest());
    setModal(false);
  };

  const getFieldError = fieldName => {
    try {
      return `${error.error} ${[fieldName]}`;
    } catch {
      return undefined;
    }
  };

  return (
    <TableCell>
      <EditButton
        click={() => setModal(true)}
      />
      <Modal
        keepMounted
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          {carrier ?
            <>
              <Typography id="keep-mounted-modal-description" sx={{mb: 2}}>
                Edit Carrier
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
                  container
                  textAlign="center"
                  spacing={2}
                  component="form"
                  onSubmit={submitFormHandler}
                >
                  <FormElement
                    onChange={inputChangeHandler}
                    name="title"
                    label="Company name"
                    value={carrierData.title}
                    required={true}
                    error={getFieldError('title')}
                    className={classes.field}
                  />

                  <FormElement
                    onChange={inputChangeHandler}
                    name="mc"
                    label="MC"
                    value={carrierData.mc}
                    required={true}
                    error={getFieldError('mc')}
                    className={classes.field}
                  />

                  <FormElement
                    onChange={inputChangeHandler}
                    name="dot"
                    label="DOT"
                    value={carrierData.dot}
                    required={true}
                    error={getFieldError('dot')}
                    className={classes.field}
                  />

                  <FormElement
                    onChange={inputChangeHandler}
                    name="fedid"
                    label="FED-ID"
                    value={carrierData.fedid}
                    required={true}
                    error={getFieldError('fedid')}
                    className={classes.field}
                  />

                  <FormElement
                    onChange={inputChangeHandler}
                    name="description"
                    label="Description"
                    value={carrierData.description}
                    multiline={true}
                    rows={3}
                    error={getFieldError('description')}
                    className={classes.field}
                  />

                  <Grid item xs={6}>
                    <ButtonWithProgress
                      loading={loading}
                      disabled={loading}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={submitFormHandler}
                    >
                      Save
                    </ButtonWithProgress>
                  </Grid>

                  <Grid item xs={6}>
                    <ButtonWithProgress
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => setModal(false)}
                    >
                      Cancel
                    </ButtonWithProgress>
                  </Grid>

                </Grid>
              </Grid>
            </>
            : <h4>Please choose a carrier to edit!</h4>}
        </Box>
      </Modal>
    </TableCell>
  );
};

export default EditCarrier;