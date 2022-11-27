import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import InnerTable from "../../components/Table/InnerTable";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import DispatcherTableBody from "../../components/Table/TableBody/DispatcherTableBody";
import {changeStatusRequest, fetchUsersRequest} from "../../store/actions/usersActions";
import AddButton from "../../components/UI/Button/AddButton/AddButton";
import NewDispatcher from "../../components/Modals/DispatcherModal/NewDispatcher";

const headerTitles = ["email", "name", "status"];

const Dispatchers = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const [dispatchers, setDispatchers] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  useEffect(() => {
    if (users.length !== null) {

      setDispatchers(() => (
        users.filter(user => user.role === "user")
      ));
    }
  }, [users]);

  const activeSwitcherHandler = async (e) => {
    const copyDispatchers = dispatchers.map(dispatcher => {
      if (dispatcher._id === e.target.id) {
        return {
          ...dispatcher,
          isWorking: e.target.checked
        }
      } else {
        return dispatcher;
      }
    });
    const dispatcher = copyDispatchers.find(dispatcher => dispatcher._id === e.target.id);
    await dispatch(changeStatusRequest(dispatcher));
    setDispatchers(copyDispatchers);
  };

  return (
    <>
      <InnerContainer>
        <Grid item sx={{paddingLeft: "15px"}}>
          <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
            Dispatchers
          </Typography>
        </Grid>

        <AddButton click={() => setOpenCreate(!openCreate)}/>

        <NewDispatcher
          modalHandler={() => setOpenCreate(!openCreate)}
          modal={openCreate}
          dispatcherRole="user"
        />

        <InnerTable
          header={
          <TableHeaderRow
            headerCells={headerTitles}
            drivers={false}
            sx={{fontSize: "16px", fontWeight: "bold", textTransform: "uppercase"}}
          />
          }
          body={
          <DispatcherTableBody dispatchers={dispatchers} switchHandler={activeSwitcherHandler}/>
          }
        />

      </InnerContainer>
    </>
  );
};

export default Dispatchers;