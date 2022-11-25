import React, {useState} from 'react';
import {InputBase, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useSelector} from "react-redux";
import useTableSearch from "../useTableSearch/useTableSearch";

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


const Search = () => {
  const drivers = useSelector(state => state.drivers.drivers);
  const [searchVal, setSearchVal] = useState(null);
  const { filteredData, loading } = useTableSearch({
    searchVal,
    drivers
  });


  return (
    <>
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
      {/*<Table*/}
      {/*  rowKey="name"*/}
      {/*  dataSource={filteredData}*/}
      {/*  // columns={userColumns}*/}
      {/*  loading={loading}*/}
      {/*  pagination={false}*/}
      {/*/>*/}
    </>
  );
};

export default Search;