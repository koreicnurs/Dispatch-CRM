import React, {useEffect, useState} from 'react';
import {Box, FormHelperText, Grid, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormElement from "../UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../UI/Button/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import {clearCarriersErrors, createCarrierRequest} from "../../store/actions/carriersActions";
import {makeStyles} from "tss-react/mui";
import AddButton from "../UI/Button/AddButton/AddButton";
import {MuiTelInput} from 'mui-tel-input';

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

const NewCarrier = () => {
  const {classes} = useStyles();

  const dispatch = useDispatch();
  const carriers = useSelector(state => state.carriers.carriers);
  const error = useSelector(state => state.carriers.addCarrierError);
  const loading = useSelector(state => state.carriers.loading);

  const [modal, setModal] = useState(false);

  const [carrier, setCarrier] = useState({
    title: '',
    mc: '',
    dot: '',
    fedid: '',
    description: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (error === null) {
      setModal(false);
    }
    // eslint-disable-next-line
  }, [carriers]);

  const openModalHandler = () => {
    dispatch(clearCarriersErrors());
    setModal(true);
  };

  const inputChangeHandler = e => {
    if (e.target) {
      const {name, value} = e.target;
      setCarrier(prev => ({...prev, [name]: value}));
    } else {
      setCarrier(prev => ({...prev, phoneNumber: e.replace(/ /g, '')}))
    }
  };

  const submitFormHandler = async e => {
    e.preventDefault();
    await dispatch(createCarrierRequest({...carrier}));
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };


  return (
    <div>
      <div>
        <AddButton click={() => openModalHandler()}/>

        <Modal
          keepMounted
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography id="keep-mounted-modal-description" sx={{ mb: 2 }}>
              New Carrier
            </Typography>

              <Grid
                component="form"
                container
                onSubmit={submitFormHandler}
                textAlign="center"
                spacing={1}
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
  
                <Grid item xs={12}>
                  <MuiTelInput
                    error={Boolean(getFieldError('phoneNumber'))}
                    preferredCountries={['US']}
                    defaultCountry={'US'}
                    name={'phoneNumber'}
                    label={'Phone Number'}
                    value={carrier.phoneNumber}
                    required={true}
                    onChange={inputChangeHandler}
                  />
                  <FormHelperText sx={{
                    color: '#d32f2f',
                    margin: '3px 14px 0'
                  }}>{getFieldError('phoneNumber')}</FormHelperText>
                </Grid>

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

                <FormElement
                  onChange={inputChangeHandler}
                  name="description"
                  label="Description"
                  value={carrier.description}
                  multiline={true}
                  rows={3}
                  error={getFieldError('description')}
                  className={classes.field}
                />

                <Grid item xs={12} container spacing={1} justifyContent="space-between">

                  <Grid item xs={6}>
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
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default NewCarrier;