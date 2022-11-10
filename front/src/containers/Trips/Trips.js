import React, {useEffect} from 'react';
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import InnerTable from "../../components/Table/InnerTable";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import {useDispatch, useSelector} from "react-redux";
import {fetchTripsRequest} from "../../store/actions/tripsActions";
import TripTableBody from "../../components/Table/TableBody/TripTableBody";

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
  }, [dispatch]);

  return (
    <>
      <InnerContainer>
        <Grid item sx={{paddingLeft: "15px"}}>
          <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
            Trips
          </Typography>
        </Grid>

        <InnerTable
          header={<TableHeaderRow headerCells={headerTitles}/>}
          body={<TripTableBody trips={trips}/>}
        />

      </InnerContainer>

    </>
    );
};

export default Trips;