import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchDriversRequest} from "../../store/actions/driversActions";
import {Grid, InputBase, styled, TableCell} from "@mui/material";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
// import {DataGrid} from "@mui/x-data-grid";
import useTableSearch from "../../components/UI/Filter/useTableSearch/useTableSearch";
import InnerTable from "../../components/Table/InnerTable";
import StatusUpdateTableBody from "../../components/Table/TableBody/StatusUpdateTableBody";
import {statusInterval} from "../../config";
import {fetchCarriersRequest} from "../../store/actions/carriersActions";
import FormSelect from "../../components/UI/Form/FormSelect/FormSelect";

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

const statuses = ['Status','in transit', 'upcoming', 'ready', 'in tr/upc', 'off'];

const tableHeaderStyle = {fontSize: "12px", fontWeight: "bold"};

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
  const carriers = useSelector(state => state.carriers.carriers);
  const [currentDrivers, setCurrentDrivers] = useState([]);
  const [carrierSelector, setCarrierSelector] = useState(["Carriers"]);
  const [selectedCarrier, setSelectedCarrier] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Status");

  useEffect(() => {
    dispatch(fetchDriversRequest());
    const interval = setInterval(() => {
      dispatch(fetchDriversRequest());
      }, statusInterval);
    return () => clearInterval(interval);
    }, [dispatch]);

  useEffect(() => {
    if (selectedCarrier.length === 0 && selectedStatus === "Status") {
      setCurrentDrivers(drivers);
    } else if (selectedCarrier.length !== 0 || selectedStatus !== "Status") {
      let driverFiltered = drivers;
      if (selectedCarrier.length !== 0) {
        driverFiltered = drivers.filter(driver => selectedCarrier.includes(driver.companyId.title));
      }
      if (selectedStatus !== "Status") {
        driverFiltered = driverFiltered.filter(driver => selectedStatus.includes(driver.status));
      }
      setCurrentDrivers(driverFiltered);
    }

  }, [drivers, selectedCarrier, selectedStatus]);

    useEffect(() => {
      dispatch(fetchCarriersRequest());
    }, [dispatch]);


    useEffect(() => {
      const carriersTitles = carriers.map(carrier => carrier.title);
      setCarrierSelector(() => [...carriersTitles]);
    }, [carriers]);

    const selectCarrierHandler = event => {
      const {
        target: { value },
      } = event;

      setSelectedCarrier(
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const selectedStatusHandler = event => {
      setSelectedStatus(event.target.value);
    };

    const tableHeader = (
      <>
        {carrierSelector.length !== null &&
          <>
            <TableCell sx={tableHeaderStyle}>
              <FormSelect
                multiple={true}
                array={carrierSelector}
                value={selectedCarrier}
                onChange={selectCarrierHandler}
                required={true}
                variant="array"
                driver={false}
                placeholder="All companies"
              />
            </TableCell>
            <TableCell sx={tableHeaderStyle}>Driver</TableCell>
            <TableCell sx={tableHeaderStyle}>
              <FormSelect
                label="Status"
                array={statuses}
                value={selectedStatus}
                onChange={selectedStatusHandler}
                required={true}
                variant="array"
                driver={false}
                def={selectedStatus}
              />
            </TableCell>
            <TableCell sx={tableHeaderStyle}>Current Status</TableCell>
            <TableCell sx={tableHeaderStyle}>PickUp</TableCell>
            <TableCell sx={tableHeaderStyle}>Delivery</TableCell>
            <TableCell sx={tableHeaderStyle}>ETA</TableCell>
            <TableCell sx={tableHeaderStyle}>Ready time</TableCell>
            <TableCell sx={tableHeaderStyle}>Notes</TableCell>
            <TableCell sx={tableHeaderStyle}>Phone number</TableCell>
          </>
        }
      </>
    );

    const [searchVal, setSearchVal] = useState(null);

    const { filteredData} = useTableSearch({
      searchVal,
      data: currentDrivers
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
          header={tableHeader}
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