import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import InnerContainer from "../InnerContainer/InnerContainer";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import PropTypes from "prop-types";
import Profile from "./Profile";
import InnerTable from "../Table/InnerTable";
import TableHeaderRow from "../Table/TableHeader/TableHeaderRow";
import UserTableBody from "../Table/TableBody/UserTableBody";
import {fetchUsersRequest} from "../../store/actions/usersActions";
import NewDispatcher from "../Modals/DispatcherModal/NewDispatcher";

const headerTitles = ["email", "name"];

const AdminProfile = ({user, error}) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  return (
    <InnerContainer>
      <Grid item sx={{paddingLeft: "15px"}}>
        <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
          My Profile (admin)
        </Typography>
      </Grid>

      <Grid item>
        <Profile user={user} error={error}/>
      </Grid>

      <Grid item sx={{paddingLeft: "15px"}}>
        <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
          Other admins
        </Typography>
      </Grid>

      <NewDispatcher
        dispatcherRole="admin"
      />

      <InnerTable
        header={
        <TableHeaderRow
          headerCells={headerTitles}
          drivers={false}
          sx={{fontSize: "16px", fontWeight: "bold", textTransform: "uppercase"}}
        />}
        body={<UserTableBody users={users}/>}
      />

    </InnerContainer>
  );
};

AdminProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminProfile;