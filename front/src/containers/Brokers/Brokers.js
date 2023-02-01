import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Grid, LinearProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import {fetchBrokersRequest} from "../../store/actions/brokersActions";
import {fetchCarriersRequest} from "../../store/actions/carriersActions";
import AddBroker from "../../components/Modals/AddBroker";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import InnerTable from "../../components/Table/InnerTable";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import BrokerTableBody from "../../components/Table/TableBody/BrokerTableBody";

const columns = [
    {key: 'arrow'},
    {key: 'name', label: 'Broker'},
    {key: 'phoneNumber', label: 'Phone Number'},
    {key: 'mc', label: 'MC'},
    {key: 'description', label: 'Description'},
    {key: 'companiesContract'},
];

const Brokers = () => {
    const dispatch = useDispatch();
    const brokers = useSelector(state => state.brokers.brokers);
    const loading = useSelector(state => state.brokers.loading);

    useEffect(() => {
        dispatch(fetchBrokersRequest());
        dispatch(fetchCarriersRequest());
    }, [dispatch]);

    return (
        <>
            {loading ? <Box sx={{width: '100%'}}><LinearProgress sx={{position: "absolute", left: 0, right: 0}}/></Box> : null}
            {brokers &&
                <InnerContainer>
                    <Grid item sx={{paddingLeft: "15px"}}>
                        <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
                            Brokers
                        </Typography>
                    </Grid>
                    <Grid container item flexDirection="row" justifyContent="space-between" alignItems="center"
                          paddingRight="15px">
                        <AddBroker/>
                    </Grid>

                    <InnerTable
                        header={<TableHeaderRow headerCells={columns} data={true}/>}
                        body={
                            <BrokerTableBody
                                columns={columns}
                                brokers={brokers}
                            />
                        }
                    />
                </InnerContainer>
            }
        </>
    );
};

export default Brokers;