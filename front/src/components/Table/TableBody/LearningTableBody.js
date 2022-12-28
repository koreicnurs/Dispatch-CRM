import React from 'react';
import {TableCell, TableRow} from "@mui/material";

const LearningTableBody = ({columns, filteredData}) => {
  return (
    <>
      {filteredData.map(article => (
        <TableRow
          key={article._id}
          sx={{
            '&:last-child td, &:last-child th': {border: 0}, background: "white"}}
        >
          {columns.map(column => {
            let value = article[column.key];
            if (column.innerKey) {
              value = value[column.innerKey];
            }
            if (column.key === 'date'){
              value = new Date(value)
                .toLocaleTimeString([],
                  {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
            }
            return <TableCell sx={{fontSize: "14px"}} key={column.key + column.innerKey}>{value}</TableCell>;
          })}
          {/*<EditDriver driverEmail={driver.email}/>*/}
        </TableRow>
      ))}
    </>
  );
};

export default LearningTableBody;