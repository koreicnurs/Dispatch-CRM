import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {Grid, InputBase, styled} from "@mui/material";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import InnerTable from "../../components/Table/InnerTable";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import DispatcherTableBody from "../../components/Table/TableBody/DispatcherTableBody";
import {changeStatusRequest, fetchUsersRequest} from "../../store/actions/usersActions";
import NewDispatcher from "../../components/Modals/DispatcherModal/NewDispatcher";
import SearchIcon from "@mui/icons-material/Search";
import useTableSearch from "../../components/UI/Filter/useTableSearch/useTableSearch";

const SearchStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#fff',
  },
  marginRight: theme.spacing(6),
  marginLeft: 0,
  marginTop: '25px',
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const headerTitles = ["avatar", "email", "name", "phone", "status"];

const Dispatchers = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const [dispatchers, setDispatchers] = useState([]);
  const [searchVal, setSearchVal] = useState(null);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const { filteredData } = useTableSearch({
    searchVal,
    data: dispatchers
  });

  useEffect(() => {
    if (users.length !== null) {

      setDispatchers(() => (
        users.filter(user => user.role === "user")
      ));
    }
  }, [users, filteredData]);

  const activeSwitcherHandler = async (e) => {
    console.log(e.target.checked)
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

        <Grid
          item
          container
          spacing={2}
          justifyContent="space-between"
        >
          <Grid padding="15px">
            <NewDispatcher
              dispatcherRole="user"
            />
          </Grid>
          <Grid>
            <SearchStyle>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                onChange={e => setSearchVal(e.target.value)}
              />
            </SearchStyle>
          </Grid>
        </Grid>



        <InnerTable
          header={
          <TableHeaderRow
            headerCells={headerTitles}
            data={true}
            sx={{fontSize: "16px", fontWeight: "bold", textTransform: "uppercase"}}
          />
          }
          body={
          <DispatcherTableBody dispatchers={filteredData} switchHandler={activeSwitcherHandler}/>
          }
        />

      </InnerContainer>
    </>
  );
};

export default Dispatchers;