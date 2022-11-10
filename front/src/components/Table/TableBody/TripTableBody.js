import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
// import FormSelect from "../../UI/Form/FormSelect/FormSelect";

const TripTableBody = ({trips}) => {

  return (
    <>
      {trips &&
        trips.map(trip => (
          <TableRow
            key={trip._id}
            sx={{'&:last-child td, &:last-child th': {border: 0}, background: "white"}}>

            <TableCell component="th" scope="row" sx={{fontSize: "12px"}}>
              {trip.datePU.substring(0, 10)}
            </TableCell>

            <TableCell sx={{fontSize: "12px"}}>
              {trip.dateDEL.substring(0, 10)}
            </TableCell>

            <TableCell sx={{fontSize: "12px"}}>{trip.loadCode}</TableCell>
            <TableCell sx={{fontSize: "12px"}}>{trip.pu}</TableCell>
            <TableCell sx={{fontSize: "12px"}}>{trip.del}</TableCell>
            <TableCell sx={{fontSize: "12px"}}>{trip.miles}</TableCell>
            <TableCell sx={{fontSize: "12px"}}>{trip.rpm * trip.miles}</TableCell>
            <TableCell sx={{fontSize: "12px"}}>{trip.rpm}</TableCell>
            <TableCell sx={{fontSize: "12px"}}>{trip.driverId.name}</TableCell>
            <TableCell sx={{fontSize: "12px"}}>test</TableCell>

            {/*<TableCell sx={{fontSize: "12px"}}>*/}
            {/*  <FormSelect*/}
            {/*    name="dispatchTeam"*/}
            {/*    id={trip._id}*/}
            {/*    value={dispatchTeam}*/}
            {/*    onchange={selectChange}*/}
            {/*    def={dispatchTeamOptions[0].title}*/}
            {/*    options={dispatchTeamOptions}*/}
            {/*    title="title"*/}
            {/*  />*/}
            {/*</TableCell>*/}


            <TableCell sx={{fontSize: "12px"}}>{trip.dispatchId.displayName}</TableCell>

          </TableRow>
        ))
      }
    </>
  );
};

export default TripTableBody;