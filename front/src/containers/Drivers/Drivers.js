import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Grid, Typography} from '@mui/material';
import {fetchDriversRequest} from '../../store/actions/driversActions';
import AddDriver from "../../components/Modals/AddDriver";
import InnerTable from "../../components/Table/InnerTable";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import DriverTableBody from "../../components/Table/TableBody/DriverTableBody";
import InnerContainer from "../../components/InnerContainer/InnerContainer";

const columns = [
  {key: 'email', label: 'Email'},
  {key: 'name', label: 'Name'},
  {key: 'phoneNumber', label: 'Phone Number'},
  {key: 'companyId', label: 'Carriers', innerKey: 'title'},
  {key: 'status', label: 'Status'},
  {key: 'description', label: 'Address', innerKey: 'address'},
  {key: 'description', label: 'DOB', innerKey: 'DOB'},
  {key: 'description', label: 'Info', innerKey: 'info'},
  {key: 'description', label: 'Reference', innerKey: 'reference'},
];

const Drivers = () => {
  const dispatch = useDispatch();
  const drivers = useSelector(state => state.drivers.drivers);

  useEffect(() => {
    dispatch(fetchDriversRequest());
  }, [dispatch]);

  return (
    <InnerContainer>
      <Grid item sx={{paddingLeft: "15px"}}>
        <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
          Drivers
        </Typography>
      </Grid>
      <Grid container item flexDirection="row" justifyContent="space-between" alignItems="center" paddingRight="15px">
        <AddDriver/>
      </Grid>
      <InnerTable
        header={<TableHeaderRow headerCells={columns} drivers={true}/>}
        body={
          <DriverTableBody
            drivers={drivers}
            columns={columns}
          />
        }
      />
    </InnerContainer>
  );
};

export default Drivers;