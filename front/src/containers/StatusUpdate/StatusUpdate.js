import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchDriverRequest,
    fetchDriversByCarrierRequest,
    updateDriverRequest
} from "../../store/actions/driversActions";
import {makeStyles} from "tss-react/mui";
import {
    Box,
    FormControl,
    Grid,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {fetchCarriersRequest} from "../../store/actions/carriersActions";
import FormSelectDriver from "../../components/UI/Form/FormSelectDriver/FormSelectDriver";
import MenuItem from "@mui/material/MenuItem";
import FormElement from "../../components/UI/Form/FormElement/FormElement";

const useStyles = makeStyles()(() => ({
    innerContainer: {
        background: '#f0f2fe',
        height: "100vh",
        paddingBottom: "15px",
        paddingTop: "15px"
    }
}));

const StatusUpdate = () => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const carriers = useSelector(state => state.carriers.carriers);
    const driversByCarrier = useSelector(state => state.drivers.driversByCarrier);
    const driver = useSelector(state => state.drivers.driver);

    const [data, setData] = useState({
        companyId: '',
        name: '',
        status: '',
        pickUp: '',
        delivery: '',
        ETA: '',
        readyTime: '',
        notes: '',
        phoneNumber: ''
    });

    const statuses = ['in transit', 'upcoming', 'off/home', 'n/a', 'sleep', 'ready', 'in tr/upc'];
    const backgroundC = ['#0AF413', 'yellow', '#FFFFFF', 'lightBlue', '#4162DF', '#FC0707', '#E10AF4'];

    useEffect(() => {
        dispatch(fetchCarriersRequest());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchDriversByCarrierRequest(data.companyId));
    }, [dispatch, data.companyId]);

    useEffect(() => {
        dispatch(fetchDriverRequest(data.name));
    }, [dispatch, data.name]);

    useEffect(() => {
        setData(prevState => ({
            ...prevState,
            status: driver?.status,
            pickUp: driver?.pickUp,
            delivery: driver?.delivery,
            ETA: driver?.ETA,
            readyTime: driver?.readyTime,
            notes: driver?.notes,
            phoneNumber: driver?.phoneNumber
        }));
    }, [driver])

    const onChange = e => {
        const {name, value} = e.target;
        setData(prevState => ({...prevState, [name]: value}));

        if (driver._id) {
            dispatch(updateDriverRequest({id: driver._id, data: {...data, name: driver.name}}));
        }
    };

    return (
        <Box className={classes.innerContainer}>
            <Grid
                container
                direction='column'
            >
                <Grid item marginBottom='15px' ml='15px'>
                    <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
                        Status Update
                    </Typography>
                </Grid>
                <Grid item>
                    <TableContainer component={Paper} sx={{ maxHeight: '90vh' }}>
                        <Table stickyHeader sx={{ minWidth: 700 }} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold', padding: '5px'}}>Carrier</TableCell>
                                    <TableCell sx={{fontWeight: 'bold', padding: '5px'}}>Driver</TableCell>
                                    <TableCell sx={{fontWeight: 'bold', padding: '5px'}}>Status</TableCell>
                                    <TableCell sx={{fontWeight: 'bold', padding: '5px', textAlign: 'center'}}>Location</TableCell>
                                    <TableCell sx={{fontWeight: 'bold', padding: '5px'}}>ETA</TableCell>
                                    <TableCell sx={{fontWeight: 'bold', padding: '5px'}}>Ready Time</TableCell>
                                    <TableCell sx={{fontWeight: 'bold', padding: '5px'}}>Notes</TableCell>
                                    <TableCell sx={{fontWeight: 'bold', padding: '5px'}}>Phone</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    <TableRow>
                                        <TableCell sx={{minWidth: '150px', padding: '5px'}}>
                                            <FormSelectDriver
                                                onChange={onChange}
                                                name='companyId'
                                                options={carriers}
                                                value={data.companyId}
                                                variant='standard'
                                                optionItem='title'
                                                optionValue='_id'
                                            />
                                        </TableCell>
                                        <TableCell sx={{minWidth: '100px', padding: '5px'}}>
                                            <FormSelectDriver
                                                onChange={onChange}
                                                name='name'
                                                options={driversByCarrier}
                                                value={data.name}
                                                variant='standard'
                                                optionItem='name'
                                                optionValue='_id'
                                            />
                                        </TableCell>
                                        <TableCell  sx={{minWidth: '70px', padding: '5px'}}>
                                                <Grid item textAlign="left" marginTop='12px'>
                                                    <FormControl fullWidth>
                                                        <Select
                                                            fullWidth
                                                            onChange={onChange}
                                                            name='status'
                                                            value={data.status || ''}
                                                            variant='standard'
                                                            displayEmpty={true}
                                                            renderValue={() => data.status}
                                                        >
                                                            {statuses.map((status, i) => (
                                                                <MenuItem key={i} value={status} sx={{background: backgroundC[i], ":hover": 'none', padding: '7px'}}>{status}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                        </TableCell>
                                        <TableCell sx={{display: 'flex'}} >
                                            <FormElement
                                                onChange={onChange}
                                                name='pickUp'
                                                value={data.pickUp  || ''}
                                                variant='standard'
                                            />
                                            >>
                                            <FormElement
                                                onChange={onChange}
                                                name='delivery'
                                                value={data.delivery  || ''}
                                                variant='standard'
                                            />
                                        </TableCell>
                                        <TableCell sx={{padding: '5px'}}>
                                            <FormElement
                                                onChange={onChange}
                                                name='ETA'
                                                value={data.ETA  || ''}
                                                variant='standard'
                                            />
                                        </TableCell>
                                        <TableCell sx={{padding: '5px'}}>
                                            <FormElement
                                                onChange={onChange}
                                                name='readyTime'
                                                value={data.readyTime  || ''}
                                                variant='standard'
                                            />
                                        </TableCell>
                                        <TableCell sx={{padding: '5px'}}>
                                            <FormElement
                                                onChange={onChange}
                                                name='notes'
                                                value={data.notes  || ''}
                                                variant='standard'
                                            />
                                        </TableCell>
                                        <TableCell sx={{padding: '5px'}}>
                                            <FormElement
                                                onChange={onChange}
                                                name='phoneNumber'
                                                value={data.phoneNumber  || ''}
                                                variant='standard'
                                            />
                                        </TableCell>
                                    </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StatusUpdate;