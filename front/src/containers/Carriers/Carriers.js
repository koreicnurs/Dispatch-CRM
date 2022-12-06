import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, InputBase, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import {fetchCarriersRequest} from "../../store/actions/carriersActions";
import AddCarrier from "../../components/Modals/AddCarrier";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import InnerTable from "../../components/Table/InnerTable";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import CarrierTableBody from "../../components/Table/TableBody/CarrierTableBody";
import SearchIcon from '@mui/icons-material/Search';
import useTableSearch from '../../components/UI/Filter/useTableSearch/useTableSearch';

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

const columns = [
  {key: 'title', label: 'Company'},
  {key: 'phoneNumber', label: 'Phone Number'},
  {key: 'mc', label: 'MC'},
  {key: 'dot', label: 'DOT'},
  {key: 'fedid', label: 'FED-ID'},
];


const Carriers = () => {
  const [searchVal, setSearchVal] = useState(null);
  
  const dispatch = useDispatch();
  const carriers = useSelector(state => state.carriers.carriers);

  useEffect(() => {
    dispatch(fetchCarriersRequest());
  }, [dispatch]);
  
  const { filteredData} = useTableSearch({
    searchVal,
    drivers: carriers
  });

  return (
    <>
      <InnerContainer>
        <Grid item sx={{paddingLeft: "15px"}}>
          <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
            Carriers
          </Typography>
        </Grid>
        <Grid
          item
          container
          spacing={2}
          justifyContent="space-between">
          <Grid padding="15px">
            <AddCarrier/>
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
          header={<TableHeaderRow headerCells={columns} data={true} sx={{fontSize: "12px", fontWeight: "bold"}}/>}
          body={
            <CarrierTableBody
              columns={columns}
              carriers={filteredData}
            />
          }
        />

      </InnerContainer>
    </>
  );
};

export default Carriers;