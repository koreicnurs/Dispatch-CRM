import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Box} from "@mui/material";
import MenuBtn from "../../UI/MenuBtn/MenuBtn";


const TripTableBody = (props) => {

  const {
    trips,
    sendTrip,
    cancelTripHandler,
    editTripHandler,
    leaveCommentHandler,
    attachFileHandler,
    viewAllHandler,
    user
  } = props;

  return (
    <>
      {trips &&
        trips.map(trip => (
          <TableRow
            key={trip._id}
            sx={{'&:last-child td, &:last-child th': {border: 0}, background: "white"}}>

            <TableCell sx={{fontSize: "14px", fontWeight: 'bold'}}>{trip.loadCode}</TableCell>
            <TableCell sx={{fontSize: "14px", fontWeight: 'bold'}}>
              {trip.pu}
              <Box sx={{fontSize: "12px", fontWeight: 'normal'}}>{trip.datePU.substring(0, 10)}</Box>
              <Box sx={{fontSize: "12px", fontWeight: 'normal'}}>{trip.timeToPU}</Box>
            </TableCell>
            <TableCell sx={{fontSize: "14px", fontWeight: 'bold'}}>
              {trip.del}
              <Box sx={{fontSize: "12px", fontWeight: 'normal'}}>{trip.dateDEL.substring(0, 10)}</Box>
              <Box sx={{fontSize: "12px", fontWeight: 'normal'}}>{trip.timeToDel}</Box>
            </TableCell>
            <TableCell sx={{fontSize: "12px"}}>{trip.miles}</TableCell>
            <TableCell sx={{fontSize: "14px", fontWeight: 'bold'}}>
              ${trip.price}
              <Box sx={{fontSize: "12px", fontWeight: 'normal'}}>${trip.rpm}/mi</Box>
            </TableCell>
            <TableCell sx={{fontSize: "14px", fontWeight: 'bold'}}>
              {trip.driverId.name}
            </TableCell>
            <TableCell sx={{fontSize: "14px", fontWeight: 'bold'}}>
              {trip.driverId.status}
            </TableCell>
            <TableCell sx={{fontSize: "12px"}}>test</TableCell>

            <TableCell sx={{fontSize: "12px"}}>
              {trip.dispatchId.displayName}
            </TableCell>

            <TableCell sx={{fontSize: "12px"}}>
              <MenuBtn
                user={user}
                trip={trip}
                sendTrip={sendTrip}
                cancelTripHandler={cancelTripHandler}
                editTripHandler={editTripHandler}
                attachFileHandler={attachFileHandler}
                leaveCommentHandler={leaveCommentHandler}
                viewAllHandler={viewAllHandler}
              />
            </TableCell>

          </TableRow>
        ))
      }
    </>
  );
};

export default TripTableBody;