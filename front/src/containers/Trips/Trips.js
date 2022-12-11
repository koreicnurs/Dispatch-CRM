import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Box, Grid, Tab, Tabs} from "@mui/material";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import {useDispatch, useSelector} from "react-redux";
import {
  cancelTripRequest,
  changeTripStatusRequest, confirmTripsRequest,
  fetchTripRequest,
  fetchTripsRequest
} from "../../store/actions/tripsActions";
import TripTableBody from "../../components/Table/TableBody/TripTableBody";
import {fetchUsersRequest} from "../../store/actions/usersActions";
import TabPanel from "../../components/TabPanel/TabPanel";
import {Link} from "react-router-dom";
import {fetchDriversRequest} from "../../store/actions/driversActions";
import NewComment from "../../components/Modals/NewComment";
import NewAttachment from "../../components/Modals/NewAttachment";
import ViewAll from "../../components/Modals/ViewAll";
import AddTrip from "../../components/Modals/AddTrip";
import EditTrip from "../../components/Modals/EditTrip";

const headerTitles = [
  "Load ID", "PU Location", "DEL Location",
  "MILES", "RATE", "Driver",
  "Dispatch Team", "Dispatch"
];

const Trips = ({history}) => {
  const dispatch = useDispatch();
  const trips = useSelector(state => state.trips.trips);
  const trip = useSelector(state => state.trips.trip);

  const drivers = useSelector(state => state.drivers.drivers);
  const users = useSelector(state => state.users.users);
  const user = useSelector(state => state.users.user);

  useEffect(() => {
    dispatch(fetchTripsRequest(history.location.search));
    dispatch(fetchUsersRequest());
    dispatch(fetchDriversRequest());
  }, [dispatch, history.location.search]);

  const [edit, setEdit] = useState(false);

  const [openComment, setComment] = useState(false);
  const handleCloseCommentModal = () => setComment(false);

  const [openAttachment, setAttachment] = useState(false);
  const handleCloseAttachmentModal = () => setAttachment(false);

  const [viewAll, setViewAll] = useState(false);
  const handleCloseViewAllModal = () => {
    setViewAll(false);
    setViewAllTripID(null);
  };

  const [commentTripId, setCommentTripId] = useState(null);
  const [attachTripId, setAttachTripId] = useState(null);
  const [viewAllTripId, setViewAllTripID] = useState(null);

  const [value, setValue] = useState(0);

  useEffect(() => {
    switch (history.location.search) {
      case '?status=upcoming':
        return setValue(0)
      case '?status=transit'  :
        return setValue(1)
      case '?status=finished'  :
        return setValue(2)
      default:
        break
    }
  }, [dispatch, history.location.search]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const sendTrip = id => {
    dispatch(changeTripStatusRequest({id, path: history.location.search}));
  };

  const cancelTripHandler = id => {
    dispatch(cancelTripRequest({id, path: history.location.search}));
  };

  const editTripHandler = id => {
    dispatch(fetchTripRequest(id));
    setEdit(true);
  };

  const attachFileHandler = id => {
    setAttachment(true);
    setAttachTripId(id);
  };

  const leaveCommentHandler = id => {
    setEdit(false);
    setCommentTripId(id);
    dispatch(fetchTripRequest(id));
    setComment(true);
  };
  
  const confirmTrip = id => {
    dispatch(confirmTripsRequest(id));
  };

  const viewAllHandler = id => {
    setEdit(false);
    dispatch(fetchTripRequest(id));
    setViewAll(true);
  };


  return (
    <>
      <EditTrip tripID={trip?._id} isEdit={edit}/>
      <NewComment handleClose={handleCloseCommentModal} open={openComment} id={commentTripId}/>
      <ViewAll handleClose={handleCloseViewAllModal} open={viewAll} id={viewAllTripId} trip={trip}/>
      <NewAttachment handleClose={handleCloseAttachmentModal} open={openAttachment} id={attachTripId}/>

      <InnerContainer>
        <Box sx={{width: '100%'}}>
          <Grid item sx={{paddingLeft: "15px"}}>
            <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
              Trips
            </Typography>
          </Grid>
          <Grid container item flexDirection="row" justifyContent="space-between" alignItems="center" paddingRight="15px">
            <AddTrip value={value}/>
          </Grid>

          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Upcoming" component={Link} to='/loads?status=upcoming' {...a11yProps(0)} />
              <Tab label="In Transit" component={Link} to='/loads?status=transit' {...a11yProps(1)} />
              <Tab label="History" component={Link} to='/loads?status=finished' {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel
            value={value}
            index={value}
            header={<TableHeaderRow headerCells={headerTitles}/>}
            body={
              <TripTableBody
                user={user}
                trips={trips}
                drivers={drivers}
                users={users}
                sendTrip={sendTrip}
                cancelTripHandler={cancelTripHandler}
                editTripHandler={editTripHandler}
                attachFileHandler={attachFileHandler}
                leaveCommentHandler={leaveCommentHandler}
                confirmTrip={confirmTrip}
                viewAllHandler={viewAllHandler}
              />
            }
          >
          </TabPanel>
        </Box>
      </InnerContainer>
    </>
  );
};

export default Trips;