import React, {useState} from 'react';
import ModalWindow from '../UI/Modal/ModalWindow';
import {FormHelperText, Grid, Typography} from '@mui/material';
import FormElement from '../UI/Form/FormElement/FormElement';
import FormSelect from '../UI/Form/FormSelect/FormSelect';
import {COMPANIES, DRIVER_STATUS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import ButtonWithProgress from '../UI/ButtonWithProgress/ButtonWithProgress';
import {
  addDriverRequest,
  changeModalBoolean,
  clearDriverErrors,
  fetchDriversRequest
} from '../../store/actions/driversActions';
import {MuiTelInput} from 'mui-tel-input';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles()(() =>({
  form : {
    overflowY: 'scroll',
    maxHeight: 800
  },
  descriptionFieldset: {
    borderRadius: '4px',
    border: '1px solid #757575'
  },
  descriptionLegend: {
    padding: '0 10px'
  },
}));

const AddDriver = () => {
  const {classes} = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.drivers.addDriverLoading);
  const error = useSelector(state => state.drivers.addDriverError);
  const modal = useSelector(state => state.drivers.modal);
  const [state, setState] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    companyId: '',
    status: '',
    description: {
      address: '',
      DOB: '',
      info: '',
      reference: '',
    },
  });
  
  const openCloseModal = () => {
    dispatch(changeModalBoolean());
    setState({
      email: '',
      name: '',
      phoneNumber: '',
      companyId: '',
      status: '',
      description: {
        address: '',
        DOB: '',
        info: '',
        reference: '',
      },
    });
    dispatch(clearDriverErrors());
  };
  
  const inputChangeHandler = (e) => {
    if (e.target) {
      const {name, value} = e.target;
      setState(prev => ({...prev, [name]: value}));
    } else {
      setState(prev => ({...prev, phoneNumber: e.replace(/ /g,'')}));
    }
  };
  
  const inputChangeHandlerDescription = e => {
    const {name, value} = e.target;
    setState(prev => ({
      ...prev,
      description: {
        ...state.description,
        [name]: value,
      }
    }));
  };
  
  const submitFormHandler = async (e) => {
    e.preventDefault();
    await dispatch(addDriverRequest({...state}));
    await dispatch(fetchDriversRequest())
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
      <ModalWindow open={modal} openCloseModal={openCloseModal} name={'Add Driver'}>
        <Grid textAlign={'center'}>
          <Typography variant={'h6'}>
            Add Driver
          </Typography>
        
          <Grid
            component='form'
            container
            spacing={2}
            onSubmit={submitFormHandler}
            className={classes.form}
            pr={'15px'}
          >
            <FormElement
              type={'email'}
              name={'email'}
              label={'Email'}
              value={state.email}
              onChange={inputChangeHandler}
              error={getFieldError('email')}
            />
  
            <FormElement
              name={'name'}
              label={'Name'}
              value={state.name}
              onChange={inputChangeHandler}
              error={getFieldError('name')}
            />
  
            <Grid item xs={12}>
              <MuiTelInput
                error={Boolean(getFieldError('phoneNumber'))}
                preferredCountries={['US']}
                defaultCountry={'US'}
                name={'phoneNumber'}
                label={'Phone Number'}
                value={state.phoneNumber}
                onChange={inputChangeHandler}
              />
              <FormHelperText sx={{color: '#d32f2f', margin: '3px 14px 0'}}>{getFieldError('phoneNumber')}</FormHelperText>
            </Grid>
  
            <FormSelect
              label={'Carriers'}
              name={'companyId'}
              array={COMPANIES}
              value={state.companyId}
              onChange={inputChangeHandler}
              variant={'object'}
              error={getFieldError('companyId')}
            />
  
            <FormSelect
              label={'Status'}
              name={'status'}
              array={DRIVER_STATUS}
              value={state.status}
              onChange={inputChangeHandler}
              variant={'array'}
              error={getFieldError('status')}
            />
            
            <Grid item xs={12}>
              <Grid
                component='fieldset'
                m={0} width={'100%'}
                container
                className={classes.descriptionFieldset}
                spacing={2}
              >
                <legend className={classes.descriptionLegend}>Description</legend>
                <FormElement
                  name={'address'}
                  label={'Address'}
                  value={state.description.address}
                  onChange={inputChangeHandlerDescription}
                  error={getFieldError('description.address')}
                />
  
                <FormElement
                  name={'DOB'}
                  label={'DOB'}
                  value={state.description.DOB}
                  onChange={inputChangeHandlerDescription}
                  error={getFieldError('description.DOB')}
                />
                
                <FormElement
                  name={'info'}
                  label={'Info'}
                  value={state.description.info}
                  onChange={inputChangeHandlerDescription}
                  error={getFieldError('description.info')}
                />
                
                <FormElement
                  name={'reference'}
                  label={'Reference'}
                  value={state.description.reference}
                  onChange={inputChangeHandlerDescription}
                  error={getFieldError('description.reference')}
                />
              </Grid>
            </Grid>
  
            <Grid item xs={6}>
              <ButtonWithProgress
                loading={loading}
                disabled={loading}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
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
                onClick={openCloseModal}
              >
                Cancel
              </ButtonWithProgress>
            </Grid>
          </Grid>
        </Grid>
      </ModalWindow>
    </div>
  );
};

export default AddDriver;