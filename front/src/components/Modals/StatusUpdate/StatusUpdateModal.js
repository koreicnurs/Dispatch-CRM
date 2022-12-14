import React, {useEffect, useState} from 'react';
import {Fade, FormHelperText, Grid, Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {MuiTelInput} from "mui-tel-input";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "tss-react/mui";
import EditButton from '../../UI/Button/EditButton/EditButton';
import FormElement from '../../UI/Form/FormElement/FormElement';
import FormSelect from '../../UI/Form/FormSelect/FormSelect';
import FileInput from '../../UI/Form/FileInput/FileInput';
import ButtonWithProgress from '../../UI/Button/ButtonWithProgress/ButtonWithProgress';
import {clearDriverErrors, updateDriverRequest} from '../../../store/actions/driversActions';
import {DRIVER_CURRENT_STATUS, DRIVER_STATUS} from '../../../constants';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  backgroundColor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const useStyles = makeStyles()(() => ({
  descriptionFieldset: {
    borderRadius: '4px',
    border: '1px solid #757575'
  },
  descriptionLegend: {
    padding: '0 10px'
  },
}));

const StatusUpdateModal = ({driverEmail}) => {
  const {classes} = useStyles();
  const dispatch = useDispatch();
  
  const drivers = useSelector(state => state.drivers.drivers);
  const carriers = useSelector(state => state.carriers.carriers);
  const editLoading = useSelector(state => state.drivers.editDriverLoading);
  const editError = useSelector(state => state.drivers.editDriverError);
  const user = useSelector(state => state.users.user);
  
  const [editModal, setEditModal] = useState(false);
  
  const [driverId, setDriverId] = useState('');
  
  const [editedData, setEditedData] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    companyId: '',
    status: '',
    currentStatus: '',
    description: {
      address: '',
      DOB: '',
      info: '',
      reference: '',
    },
    license: '',
    ETA: '',
    readyTime: '',
    notes: '',
  });
  
  useEffect(() => {
    setEditModal(false);
  }, [drivers]);
  
  const openCloseModal = driverEmail => {
    const driver = drivers.filter(item => item.email === driverEmail)[0];
    setDriverId(driver._id);
  
    setEditedData({
      email: driver.email,
      name: driver.name,
      phoneNumber: driver.phoneNumber,
      companyId: driver.companyId._id,
      status: driver.status,
      currentStatus: driver.currentStatus,
      ETA: driver.ETA === undefined ? '' : driver.ETA,
      readyTime: driver.readyTime === undefined ? '' : driver.readyTime,
      notes: driver.notes === undefined ? '' : driver.notes,
      description: {
        address: driver.description.address,
        DOB: driver.description.DOB,
        info: driver.description.info,
        reference: driver.description.reference,
      },
    });
  
    setEditModal(true);
    dispatch(clearDriverErrors());
  };
  
  const inputChangeHandler = (e) => {
    if (e.target) {
      const {name, value} = e.target;
      setEditedData(prev => ({...prev, [name]: value}));
    } else {
      setEditedData(prev => ({...prev, phoneNumber: e.replace(/ /g, '')}));
    }
  };
  
  const inputChangeHandlerDescription = e => {
    const {name, value} = e.target;
    setEditedData(prev => ({
      ...prev,
      description: {
        ...editedData.description,
        [name]: value,
      }
    }));
  };
  
  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];
  
    setEditedData(prev => ({...prev, [name]: file}));
  };
  
  const submitFormHandler = async e => {
    e.preventDefault();
    
    const formData = new FormData();
    
    Object.keys(editedData).forEach(key => {
      if (key === 'description') {
        formData.append(key, JSON.stringify(editedData[key]));
      } else {
        formData.append(key, editedData[key]);
      }
    });
  
    dispatch(updateDriverRequest({id: driverId, data: formData, user}));
  };
  
  const getFieldError = fieldName => {
    try {
      return editError.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };
  
  return (
    <>
      <EditButton click={() => openCloseModal(driverEmail)}/>
      <Modal
        open={editModal}
        onClose={() => setEditModal(false)}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
        <Fade in={editModal}>
          <Box sx={style}>
            <div>
              <Grid>
                <Typography variant={'h6'}>
                  Edit driver
                </Typography>
                
                <Grid
                  component='form'
                  container
                  spacing={2}
                  onSubmit={submitFormHandler}
                  pr={'15px'}
                >
                  <Grid
                    item
                    container
                    spacing={2}
                    justifyContent="space-between"
                  >
                    <Grid item width="49.5%">
                      <FormElement
                        type={'email'}
                        name={'email'}
                        label={'Email'}
                        value={editedData.email}
                        required={true}
                        onChange={inputChangeHandler}
                        error={getFieldError('email')}
                        disabled={true}
                      />
                    </Grid>
                    
                    <Grid item width="49.5%">
                      <FormElement
                        name={'name'}
                        label={'Name'}
                        value={editedData.name}
                        required={true}
                        onChange={inputChangeHandler}
                        error={getFieldError('name')}
                        disabled={true}
                      />
                    </Grid>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <MuiTelInput
                      error={Boolean(getFieldError('phoneNumber'))}
                      preferredCountries={['US']}
                      defaultCountry={'US'}
                      name={'phoneNumber'}
                      label={'Phone Number'}
                      value={editedData.phoneNumber}
                      required={true}
                      onChange={inputChangeHandler}
                      disabled={true}
                    />
                    <FormHelperText sx={{
                      color: '#d32f2f',
                      margin: '3px 14px 0'
                    }}>{getFieldError('phoneNumber')}</FormHelperText>
                  </Grid>
  
                  <Grid item width={"100%"} xs={12}>
                    <FormSelect
                      label={'Carriers'}
                      name={'companyId'}
                      value={editedData.companyId}
                      onChange={inputChangeHandler}
                      array={carriers}
                      required={true}
                      variant={'object'}
                      error={getFieldError('companyId')}
                      disabled={true}
                    />
                  </Grid>
  
                  <Grid
                    item
                    container
                    spacing={2}
                    justifyContent="space-between"
                  >
                    <Grid item width="49.5%">
                      <FormSelect
                        label={'Status'}
                        name={'status'}
                        array={DRIVER_STATUS}
                        required={true}
                        value={editedData.status}
                        onChange={inputChangeHandler}
                        variant={'array'}
                        error={getFieldError('status')}
                      />
                    </Grid>
                    <Grid item width="49.5%">
                      <FormSelect
                        label={'Current status'}
                        name={'currentStatus'}
                        array={DRIVER_CURRENT_STATUS}
                        value={editedData.currentStatus}
                        required={true}
                        onChange={inputChangeHandler}
                        variant={'array'}
                        error={getFieldError('currentStatus')}
                        disabled={editedData.status !== 'in transit' && editedData.status !== 'in tr/upc'}
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
                        type={'text'}
                        name={'ETA'}
                        label={'ETA'}
                        value={editedData.ETA}
                        onChange={inputChangeHandler}
                        error={getFieldError('ETA')}
                      />
                    </Grid>
    
                    <Grid item width="49.5%">
                      <FormElement
                        type={'text'}
                        name={'readyTime'}
                        label={'Ready Time'}
                        value={editedData.readyTime}
                        onChange={inputChangeHandler}
                        error={getFieldError('readyTime')}
                      />
                    </Grid>
                  </Grid>
  
                  <Grid item xs={12}>
                    <FormElement
                      name={'notes'}
                      label={'Notes'}
                      value={editedData.notes}
                      onChange={inputChangeHandler}
                      error={getFieldError('notes')}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FileInput
                      label='License'
                      name='license'
                      onChange={fileChangeHandler}
                      disabled={true}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Grid
                      component='fieldset'
                      m={0} width={'100%'}
                      container
                      className={classes.descriptionFieldset}
                      spacing={2}
                    >
                      <legend className={classes.descriptionLegend}>Description</legend>
                      <Grid
                        item
                        container
                        spacing={2}
                        justifyContent="space-between"
                      >
                        <Grid item width="49.5%">
                          <FormElement
                            name={'address'}
                            label={'Address'}
                            value={editedData.description.address}
                            required={true}
                            onChange={inputChangeHandlerDescription}
                            error={getFieldError('description.address')}
                            disabled={true}
                          />
                        </Grid>
                        <Grid item width="49.5%">
                          <FormElement
                            name={'DOB'}
                            label={'DOB'}
                            value={editedData.description.DOB}
                            required={true}
                            onChange={inputChangeHandlerDescription}
                            error={getFieldError('description.DOB')}
                            disabled={true}
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
                            name={'info'}
                            label={'Info'}
                            value={editedData.description.info}
                            required={true}
                            onChange={inputChangeHandlerDescription}
                            error={getFieldError('description.info')}
                            disabled={true}
                          />
                        </Grid>
                        <Grid item width="49.5%">
                          <FormElement
                            name={'reference'}
                            label={'Reference'}
                            value={editedData.description.reference}
                            required={true}
                            onChange={inputChangeHandlerDescription}
                            error={getFieldError('description.reference')}
                            disabled={true}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <ButtonWithProgress
                      loading={editLoading}
                      disabled={editLoading}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Save Changes
                    </ButtonWithProgress>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <ButtonWithProgress
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => setEditModal(false)}
                    >
                      Cancel
                    </ButtonWithProgress>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default StatusUpdateModal;