import React, {useEffect} from 'react';
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import InnerTable from "../../components/Table/InnerTable";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import {useDispatch} from "react-redux";
import {fetchTripsRequest} from "../../store/actions/tripsActions";

const headerTitles = [
  "Loading date", "Unloading date",
    "Load ID", "PU Location", "DEL Location",
    "MILES", "RATE", "RPM", "Driver",
    "Dispatch Team", "Dispatch"
];

const Trips = () => {
  const dispatch = useDispatch();

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
        />



            </InnerContainer>

        </>
    );
};

export default Trips;