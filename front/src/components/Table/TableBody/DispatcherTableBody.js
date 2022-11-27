import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import SwitchForm from "../../UI/Form/SwitchForm/SwitchForm";

const DispatcherTableBody = ({dispatchers, switchHandler}) => {
  return (
    <>
      {dispatchers.map(dispatcher => (
        <TableRow
          key={dispatcher._id}
          sx={{
            '&:last-child td, &:last-child th': {border: 0}, background: "white",
            cursor: "pointer", ":active": {background: '#f0f2fe'}
          }}
        >
          <TableCell component="th" scope="row" sx={{fontSize: "18px"}}>
            {dispatcher.email}
          </TableCell>
          <TableCell component="th" scope="row" sx={{fontSize: "18px"}}>
            {dispatcher.displayName}
          </TableCell>
          <TableCell component="th" scope="row" sx={{fontSize: "16px"}}>
            <SwitchForm
              handleChange={switchHandler}
              id={dispatcher._id}
              name="isWorking"
              checked={dispatcher.isWorking}
              label={dispatcher.isWorking ? "Active" : "Inactive"}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default DispatcherTableBody;