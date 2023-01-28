import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Grid, IconButton, InputBase, LinearProgress, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import {fetchCarriersRequest, fetchSearchedCarriersRequest} from "../../store/actions/carriersActions";
import AddCarrier from "../../components/Modals/AddCarrier";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import InnerTable from "../../components/Table/InnerTable";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import CarrierTableBody from "../../components/Table/TableBody/CarrierTableBody";
import SearchIcon from '@mui/icons-material/Search';

const SearchStyle = styled('div')(({theme}) => ({
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

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
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
    {key: 'document', label: 'Document'},
    {key: 'description', label: 'Description'}
];


const Carriers = () => {
    const [searchVal, setSearchVal] = useState(null);


    const dispatch = useDispatch();
    const carriers = useSelector(state => state.carriers.carriers);
    const loading = useSelector(state => state.carriers.loading);

    useEffect(() => {
        dispatch(fetchCarriersRequest());
    }, [dispatch]);

    const searchCarriers = async () => {
        await dispatch(fetchSearchedCarriersRequest(searchVal));
    };

    return (
        <>
            {loading ? <Box sx={{width: '100%'}}><LinearProgress sx={{position: "absolute", left: 0, right: 0}}/></Box> : null}
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

                    <Grid
                        sx={{
                            margin: '10px 20px 20px 40px'
                        }}
                    >
                        <SearchStyle
                            sx={{
                                width: '100%',
                            }}>
                            <IconButton onClick={searchCarriers}>
                                <SearchIcon/>
                            </IconButton>
                            <StyledInputBase
                                placeholder="Search"
                                inputProps={{'aria-label': 'search'}}
                                onChange={e => setSearchVal(e.target.value)}
                            />
                        </SearchStyle>
                    </Grid>
                </Grid>

                <InnerTable
                    header={<TableHeaderRow headerCells={columns} data={true}
                                            sx={{fontSize: "12px", fontWeight: "bold"}}/>}
                    body={
                        <CarrierTableBody
                            columns={columns}
                            carriers={carriers}
                        />
                    }
                />

            </InnerContainer>

        </>
    );
};

export default Carriers;