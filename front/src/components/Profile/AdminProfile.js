import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import InnerContainer from "../InnerContainer/InnerContainer";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import PropTypes from "prop-types";
import Profile from "./Profile";
import AddButton from "../UI/Button/AddButton/AddButton";
import InnerTable from "../Table/InnerTable";
import TableHeaderRow from "../Table/TableHeader/TableHeaderRow";
import UserTableBody from "../Table/TableBody/UserTableBody";
import {fetchUsersRequest} from "../../store/actions/usersActions";
import EditDispatcher from "../Modals/DispatcherModal/EditDispatcher";
import NewDispatcher from "../Modals/DispatcherModal/NewDispatcher";

const headerTitles = ["email", "name"];

const AdminProfile = ({user, error}) => {
  const dispatch = useDispatch();
  const [openChange, setOpenChange] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const users = useSelector(state => state.users.users);
  const [chosenDispatcher, setChosenDispatcher] = useState(null);

  const chooseDispatcher = id => {
    setChosenDispatcher(users.find(user => user._id === id));
    setOpenChange(!openChange);
  };

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
          Dispatchers
        </Typography>
      </Grid>

      <AddButton click={() => setOpenCreate(!openCreate)}/>

      <NewDispatcher
        modalHandler={() => setOpenCreate(!openCreate)}
        modal={openCreate}
      />

      <InnerTable
        header={
        <TableHeaderRow
          headerCells={headerTitles}
          drivers={false}
          sx={{fontSize: "16px", fontWeight: "bold", textTransform: "uppercase"}}
        />}
        body={<UserTableBody users={users} onClickHandler={chooseDispatcher}/>}
      />

      {
        chosenDispatcher &&
        <EditDispatcher
          modalHandler={() => setOpenChange(!openChange)}
          modal={openChange}
          dispatcher={chosenDispatcher}
        />
      }


    </InnerContainer>
  );
};

AdminProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminProfile;