import React from 'react';
import {TableCell, TableRow} from "@mui/material";
import EditStatusUpdate from '../../Modals/StatusUpdate/EditStatusUpdate';

const StatusUpdateTableBody = ({columns, filteredData}) => {

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
            return <TableCell sx={{fontSize: "12px", cursor: 'default'}} key={column.key + column.innerKey}>{value}</TableCell>;
          })}
          <EditStatusUpdate driverEmail={driver.email}/>
        </TableRow>
      ))
      }
    </>
  );
};

export default StatusUpdateTableBody;