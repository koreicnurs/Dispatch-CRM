import React, {useEffect} from 'react';
import AddDriver from '../../components/AddDriver/AddDriver';
import {fetchDriversRequest} from '../../store/actions/driversActions';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from 'tss-react/mui';
import {Grid, Typography} from '@mui/material';
import DriversTable from '../../components/DriversTable/DriversTable';

const columns = [
  { key: 'email', label: 'Email'},
  { key: 'name', label: 'Name'},
  { key: 'phoneNumber', label: 'Phone Number'},
  { key: 'companyId', label: 'Carriers', innerKey: 'title'},
  { key: 'status', label: 'Status'},
  { key: 'description', label: 'Address', innerKey: 'address'},
  { key: 'description', label: 'DOB', innerKey: 'DOB'},
  { key: 'description', label: 'Info', innerKey: 'info'},
  { key: 'description', label: 'Reference', innerKey: 'reference'},
];

const useStyles = makeStyles()(() =>({
  driversWrapper : {
    backgroundColor: '#F0F2FE',
    padding: 15,
    minHeight: '75vh',
    backgroundAttachment: 'fixed'
  },
  driversTitle: {
    color: '#314694',
    fontWeight: 700,
    fontSize: 24
  }
}));

const Drivers = () => {
  const {classes} = useStyles();
  const dispatch = useDispatch();
  const drivers = useSelector(state => state.drivers.drivers);

  useEffect(() => {
    dispatch(fetchDriversRequest());
  }, [dispatch]);

  return (
    <Grid>
      <Grid mb='25px' px='48px' container alignItems='center' justifyContent='space-between'>
        <Typography variant={'h5'} className={classes.driversTitle}>
          Drivers
        </Typography>
        <AddDriver/>
      </Grid>
      <Grid className={classes.driversWrapper}>
        {drivers.length !== 0 ?
          <DriversTable columns={columns} drivers={drivers}/> :
          <Typography variant={'h6'} className={classes.driversTitle}>
            No driver
          </Typography>
        }
      </Grid>
    </Grid>
  );
};

export default Drivers;