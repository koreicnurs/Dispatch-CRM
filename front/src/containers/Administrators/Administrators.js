import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import NewDispatcher from "../../components/Modals/DispatcherModal/NewDispatcher";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import UserTableBody from "../../components/Table/TableBody/UserTableBody";
import InnerTable from "../../components/Table/InnerTable";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import {fetchUsersRequest} from "../../store/actions/usersActions";

const headerTitles = ["email", "name"];

const Administrators = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const users = useSelector(state => state.users.users);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  return (
    <InnerContainer>
      {user.role === "admin" &&
        <>
          <Grid item sx={{paddingLeft: "15px"}}>
            <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
              Other admins
            </Typography>
          </Grid>

          <NewDispatcher dispatcherRole="admin" title="New Administrator"/>

          <InnerTable
            header={
            <TableHeaderRow
              headerCells={headerTitles}
              drivers={false}
              sx={{fontSize: "16px", fontWeight: "bold", textTransform: "uppercase"}}
            />}
            body={<UserTableBody users={users}/>}
          />
        </>
      }
    </InnerContainer>
  );
};

export default Administrators;