import React from 'react';
import {useSelector} from "react-redux";
import AdminProfile from "../../components/Profile/AdminProfile";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import NewDispatcher from "../../components/Modals/DispatcherModal/NewDispatcher";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import UserTableBody from "../../components/Table/TableBody/UserTableBody";
import InnerTable from "../../components/Table/InnerTable";

const headerTitles = ["email", "name"];

const Administrators = () => {
  const user = useSelector(state => state.users.user);
  const users = useSelector(state => state.users.users);

  return (
    <InnerContainer>
      {user.role === "admin" &&
        <>
          <NewDispatcher dispatcherRole="admin"/>

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