import React, {useEffect, useState} from 'react';
import {Fade, Grid, Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import EditButton from '../../UI/Button/EditButton/EditButton';
import FormElement from '../../UI/Form/FormElement/FormElement';
import FormSelect from '../../UI/Form/FormSelect/FormSelect';
import ButtonWithProgress from '../../UI/Button/ButtonWithProgress/ButtonWithProgress';
import {clearDriverErrors, updateDriverStatusRequest} from '../../../store/actions/driversActions';
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

const StatusUpdateModal = ({driverEmail}) => {
  const dispatch = useDispatch();
  
  const drivers = useSelector(state => state.drivers.drivers);
  const editLoading = useSelector(state => state.drivers.editDriverLoading);
  const editError = useSelector(state => state.drivers.editDriverError);
  const user = useSelector(state => state.users.user);
  
  const [editModal, setEditModal] = useState(false);
  
  const [driverId, setDriverId] = useState('');
  
  const [editedData, setEditedData] = useState({
    name: '',
    status: '',
    currentStatus: '',
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
      name: driver.name,
      status: driver.status,
      currentStatus: driver.currentStatus,
      ETA: driver.ETA === undefined ? '' : driver.ETA,
      readyTime: driver.readyTime === undefined ? '' : driver.readyTime,
      notes: driver.notes === undefined ? '' : driver.notes,
    });
  
    setEditModal(true);
    dispatch(clearDriverErrors());
  };
  
  const inputChangeHandler = (e) => {
    const {name, value} = e.target;
    setEditedData(prev => ({...prev, [name]: value}));
  };
  
  const submitFormHandler = async e => {
    e.preventDefault();
  
    dispatch(updateDriverStatusRequest({id: driverId, data: editedData, user}));
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
                  Edit status
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
                    
                    <Grid item width="100%">
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