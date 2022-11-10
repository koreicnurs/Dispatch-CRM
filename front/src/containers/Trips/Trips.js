import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import InnerTable from "../../components/Table/InnerTable";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import {useDispatch, useSelector} from "react-redux";
import {fetchTripsRequest} from "../../store/actions/tripsActions";
import TripTableBody from "../../components/Table/TableBody/TripTableBody";
import AddButton from "../../components/UI/AddButton/AddButton";
import NewTrip from "../../components/Modals/NewTrip";

const headerTitles = [
  "Loading date", "Unloading date",
    "Load ID", "PU Location", "DEL Location",
    "MILES", "RATE", "RPM", "Driver",
    "Dispatch Team", "Dispatch"
];

const dispatchTeamTest = [
  {title: "Team #1", _id: 0},
  {title: "Team #2", _id: 1},
];

const Trips = () => {
  const dispatch = useDispatch();
  const trips = useSelector(state => state.trips.trips);

  useEffect(() => {
    dispatch(fetchTripsRequest());
  }, [dispatch]);

  const [loads, setLoads] = useState([]);

  useEffect(() => {
    if (trips.length !== 0) {

      setLoads(trips);
    }

  }, [trips]);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [selectorData, setSelectorData] = useState(
    {dispatchTeam: ""}
  );


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
            dispatchTeam={selectorData.dispatchTeam}
            dispatchTeamOptions={dispatchTeamTest}
          />
        }
        />

      </InnerContainer>

    </>
    );
};

export default Trips;