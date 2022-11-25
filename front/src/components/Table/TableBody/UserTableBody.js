import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

const UserTableBody = ({users}) => {
  const currentUser = useSelector(state => state.users.user);

  return (
    <>
      {users &&
        users.filter(user => user.role === "admin").map(user => {
          if (user._id !== currentUser._id) {
            return (
              <TableRow
                key={user._id}
                sx={{'&:last-child td, &:last-child th': {border: 0}, background: "white"}}
              >
                <TableCell component="th" scope="row" sx={{fontSize: "16px"}}>
                  {user.email}
                </TableCell>

                <TableCell component="th" scope="row" sx={{fontSize: "16px"}}>
                  {user.displayName}
                </TableCell>

              </TableRow>
            );
          }
          return null;
        })
      }
    </>
  );
};

UserTableBody.propsType = {
  users: PropTypes.array.isRequired,
}

export default UserTableBody;