import React, {useEffect} from 'react';
import Typography from "@mui/material/Typography";
import {Box, Grid, LinearProgress} from "@mui/material";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import {useDispatch, useSelector} from "react-redux";
import {fetchTripsByCarrierRequest} from "../../store/actions/tripsActions";
import TripTableBody from "../../components/Table/TableBody/TripTableBody";
import {fetchUsersRequest} from "../../store/actions/usersActions";
import InnerTable from "../../components/Table/InnerTable";

const headerTitles = [
  "Load ID", "PU Location", "DEL Location",
  "MILES", "RATE", "Driver", "Broker",
];

const CarrierTrips = () => {
  const dispatch = useDispatch();
  const trips = useSelector(state => state.trips.tripsByCarrier);
  const loading = useSelector(state => state.trips.loading);
  const drivers = useSelector(state => state.drivers.drivers);
  const users = useSelector(state => state.users.users);
  const user = useSelector(state => state.users.user);

  useEffect(() => {
    dispatch(fetchTripsByCarrierRequest());
    dispatch(fetchUsersRequest());
  }, [dispatch]);



  return (
    <>
      {loading ? <Box sx={{width: '100%'}}><LinearProgress sx={{position: "absolute", left: 0, right: 0}}/></Box> : null}
      <InnerContainer>
        <Box sx={{width: '100%'}}>
          <Grid item sx={{paddingLeft: "15px"}}>
            <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
              Trips
            </Typography>
          </Grid>

          <InnerTable
            header={<TableHeaderRow headerCells={headerTitles} data={false} sx={{fontSize: "12px", fontWeight: "bold"}}/>}
            body={
              <TripTableBody
                user={user}
                trips={trips}
                drivers={drivers}
                users={users}
              />
            }
          />
        </Box>
      </InnerContainer>
    </>
  );
};

export default CarrierTrips;