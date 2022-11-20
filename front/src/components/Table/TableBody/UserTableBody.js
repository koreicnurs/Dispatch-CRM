import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditButton from "../../UI/Button/EditButton/EditButton";
import {useSelector} from "react-redux";

const UserTableBody = ({users, onClickHandler}) => {
  const currentUser = useSelector(state => state.users.user);

  return (
    <>
      {users &&
        users.map(user => {
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

                <TableCell component="th" scope="row" sx={{fontSize: "16px"}}>
                  <EditButton click={() => onClickHandler(user._id)}/>
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

export default UserTableBody;