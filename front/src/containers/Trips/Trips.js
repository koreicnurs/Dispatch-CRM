import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import InnerTable from "../../components/Table/InnerTable";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import {useDispatch, useSelector} from "react-redux";
import {fetchTripsRequest} from "../../store/actions/tripsActions";
import TripTableBody from "../../components/Table/TableBody/TripTableBody";
import AddButton from "../../components/UI/Button/AddButton/AddButton";
import NewTrip from "../../components/Modals/NewTrip";
import {fetchUsersRequest} from "../../store/actions/usersActions";

const headerTitles = [
  "Loading date", "Unloading date",
    "Load ID", "PU Location", "DEL Location",
    "MILES", "RATE", "RPM", "Driver",
    "Dispatch Team", "Dispatch"
];

const Trips = () => {
  const dispatch = useDispatch();
  const trips = useSelector(state => state.trips.trips);

  useEffect(() => {
    dispatch(fetchTripsRequest());
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const [loads, setLoads] = useState([]);

  useEffect(() => {
    if (trips.length !== 0) {
      setLoads(trips.map(trip => ({
        ...trip,
        driverId: trip.driverId._id,
        dispatchId: trip.dispatchId._id
      })));
    }

  }, [trips]);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const drivers = useSelector(state => state.drivers.drivers);
  const users = useSelector(state => state.users.users);

  const selectorChangeHandler = (e, id) => {
    const {name, value} = e.target.value;

    if (loads.length !== 0) {
      setLoads(prevState => {
        return loads.map(load => {
          if (load._id === id) {
            return {...prevState, [name]: value}
          } else {
            return load;
          }
        })
      })
    }
  };

  return (
    <>
      <NewTrip handleClose={handleClose} open={open}/>

      <InnerContainer>

        <Grid item sx={{paddingLeft: "15px"}}>
          <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
            Trips
          </Typography>
        </Grid>

        <AddButton click={() => setOpen(true)}/>

        <InnerTable
          header={<TableHeaderRow headerCells={headerTitles}/>}
          body={
          <TripTableBody
            trips={loads}
            drivers={drivers}
            users={users}
            selectChange={selectorChangeHandler}
          />
        }
        />

      </InnerContainer>

    </>
    );
};

export default Trips;