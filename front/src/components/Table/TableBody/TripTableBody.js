import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import InlineFormSelect from "../../UI/Form/FormSelect/InlineFormSelect";

const TripTableBody = ({trips, selectChange, drivers, users}) => {

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
            <TableCell sx={{fontSize: "12px"}}>
              <InlineFormSelect
                name="driverId"
                id={trip._id}
                value={trip.driverId._id}
                onchange={selectChange}
                def={trip.driverId}
                options={drivers}
                title="name"
              />
            </TableCell>
            <TableCell sx={{fontSize: "12px"}}>test</TableCell>

            <TableCell sx={{fontSize: "12px"}}>
              <InlineFormSelect
                name="dispatchId"
                id={trip._id}
                value={trip.dispatchId._id}
                onchange={selectChange}
                def={trip.dispatchId}
                options={users}
                title="displayName"
              />
            </TableCell>

          </TableRow>
        ))
      }
    </>
  );
};

export default TripTableBody;