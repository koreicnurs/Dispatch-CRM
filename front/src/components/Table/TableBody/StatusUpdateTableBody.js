import React from 'react';
import {TableCell, TableRow} from "@mui/material";
import EditStatusUpdate from '../../Modals/StatusUpdate/EditStatusUpdate';

const StatusUpdateTableBody = ({columns, filteredData}) => {
  const backgroundColor = (column, driver) => {
    if (column.key === 'status') {
      switch (driver.status) {
        case 'in transit':
          return '#0AF413';
        case 'upcoming':
          return '#EAEF0A';
        case 'ready':
          return '#FC0707';
        case 'in tr/upc':
          return '#E10AF4';
        default:
          return 'white';
      }
    } else if (column.key === 'currentStatus'){
      switch (driver.currentStatus) {
        case 'driving':
          return '#4162DF';
        case 'rest':
          return 'grey';
        case 'emergency':
          return '#FC0707';
        case 'n/a':
          return '#314694';
        default:
          return 'white';
      }
    }
  };
  
  const color = (column, driver) => {
    if (column.key === 'status' && driver.status !== 'off' && driver.status !== 'upcoming' && driver.status !== 'in transit') {
      return 'white';
    } else if (column.key === 'currentStatus' && driver.currentStatus !== 'null'){
      return 'white';
    }
  };

  return (
    <>
      {filteredData.map(driver => (
        <TableRow
          key={driver._id}
          sx={{
            '&:last-child td, &:last-child th': {border: 0}, background: "white",
            cursor: "pointer", ":active": {background: '#f0f2fe'}
          }}
        >
          {columns.map(column => {
            let value = driver[column.key];
            if (column.innerKey) {
              value = value[column.innerKey];
            }
            return <TableCell sx={{fontSize: "12px", cursor: 'default',
              background: backgroundColor(column, driver), color: color(column, driver)}} key={column.key + column.innerKey}>{value}</TableCell>;
          })}
          <EditStatusUpdate driverEmail={driver.email}/>
        </TableRow>
      ))
      }
    </>
  );
};

export default StatusUpdateTableBody;