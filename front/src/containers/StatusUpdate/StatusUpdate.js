import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchDriversRequest} from "../../store/actions/driversActions";
import {Grid, InputBase, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
// import {DataGrid} from "@mui/x-data-grid";
import useTableSearch from "../../components/UI/Filter/useTableSearch/useTableSearch";
import InnerTable from "../../components/Table/InnerTable";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import StatusUpdateTableBody from "../../components/Table/TableBody/StatusUpdateTableBody";

//uncomment for DataGrid
// const columns = [
//     {field: 'carrier', headerName: 'Carrier', width:150},
//     {field: 'name', headerName: 'Driver', width:150},
//     {field: 'status', headerName: 'Status', width:150, editable: true,},
//     {field: 'currentStatus', headerName: 'Current Status', width:150},
//     {field: 'pickup', headerName: 'Pick Up', width:150, sortable: false, filterable: false, disableColumnMenu: true},
//     {field: 'delivery', headerName: 'Delivery', width:150, sortable: false, filterable: false, disableColumnMenu: true},
//     {field: 'ETA', headerName: 'ETA', width:150, sortable: false, filterable: false, disableColumnMenu: true},
//     {field: 'readyTime', headerName: 'Ready Time', width:150, sortable: false, filterable: false, disableColumnMenu: true},
//     {field: 'notes', headerName: 'Notes', width:150, sortable: false, filterable: false, disableColumnMenu: true},
//     {field: 'phoneNumber', headerName: 'Phone Number', width:150, sortable: false, filterable: false, disableColumnMenu: true},
// ];

// uncomment for Table
const columns = [
    {key: 'companyId', label: 'Carrier', innerKey: 'title'},
    {key: 'name', label: 'Driver'},
    {key: 'status', label: 'Status'},
    {key: 'currentStatus', label: 'Current Status'},
    {key: 'pickup', label: 'Pick Up'},
    {key: 'delivery', label: 'Delivery'},
    {key: 'ETA', label: 'ETA'},
    {key: 'readyTime', label: 'Ready Time'},
    {key: 'notes', label: 'Notes'},
    {key: 'phoneNumber', label: 'Phone Number'},
];

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



const StatusUpdate = () => {
    const dispatch = useDispatch();
    const drivers = useSelector(state => state.drivers.drivers);

    useEffect(() => {
        dispatch(fetchDriversRequest());
    }, [dispatch]);

  const [searchVal, setSearchVal] = useState(null);

  const { filteredData} = useTableSearch({
    searchVal,
    data: drivers
  });

  //uncomment for DataGrid
  // const rows = drivers.map((row) => ({
  //   id: row._id,
  //   carrier: row.companyId.title,
  //   name: row.name,
  //   status: row.status,
  //   currentStatus: row.currentStatus,
  //   pickup: row.pickUp,
  //   delivery: row.delivery,
  //   ETA: row.ETA,
  //   readyTime: row.readyTime,
  //   notes: row.notes,
  //   phoneNumber: row.phoneNumber
  // }));

  // const handleCellEditCommit = useCallback(
  //   ({ id, field, value }) => {
  //     console.log(id)
  //     console.log(field)
  //     console.log(value)
  //   }, []
  // );

    return (
      <InnerContainer>
        <Grid item sx={{paddingLeft: "15px"}}>
          <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
              Status Update
          </Typography>
        </Grid>
        <Grid item sx={{width: 350, marginLeft: 'auto', marginBottom: 3}}>
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

        <InnerTable
          header={<TableHeaderRow headerCells={columns} data={true} sx={{fontSize: "12px", fontWeight: "bold"}}/>}
          body={
            <StatusUpdateTableBody
              columns={columns}
              filteredData={filteredData}
            />
          }
        />

        {/*<div style={{height: '100vh', width: '100%'}}>*/}
        {/*  <DataGrid*/}
        {/*    sx={{fontSize: 14}}*/}
        {/*    rows={rows}*/}
        {/*    columns={columns}*/}
        {/*    pageSize={100}*/}
        {/*    rowsPerPageOptions={[100]}*/}
        {/*    disableColumnSelector*/}
        {/*    disableSelectionOnClick*/}
        {/*    hideFooterPagination*/}
        {/*    onCellEditCommit={handleCellEditCommit}*/}
        {/*  />*/}
        {/*</div>*/}
      </InnerContainer>
    );
};

export default StatusUpdate;