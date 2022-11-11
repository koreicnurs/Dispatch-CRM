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
import FormSelect from "../../components/UI/Form/FormSelect/FormSelect";
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
        location: '',
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

    const onChange = async e => {
        const {name, value} = e.target;
        console.log(name, value);
        setData(prevState => ({...prevState, [name]: value}));
        const driverData = {
            ...driver,
            ...data,
            // email: driver.email,
            // description: {...driver.description}
        };
        console.log(driverData);
        // await dispatch(updateDriverRequest({id: driver._id, }))
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
                                    <TableCell sx={{fontWeight: 'bold'}}>Carrier</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Driver</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Status</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Location</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>ETA</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Ready Time</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Notes</TableCell>
                                    <TableCell sx={{fontWeight: 'bold'}}>Phone</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    <TableRow>
                                        <TableCell sx={{minWidth: '200px', padding: '5px'}}>
                                            <FormSelect
                                                onChange={onChange}
                                                name='companyId'
                                                options={carriers}
                                                value={data.companyId}
                                                variant='standard'
                                                optionItem='title'
                                            />
                                        </TableCell>
                                        <TableCell sx={{minWidth: '200px', padding: '5px'}}>
                                            <FormSelect
                                                onChange={onChange}
                                                name='name'
                                                options={driversByCarrier}
                                                value={data.name}
                                                variant='standard'
                                                optionItem='name'
                                            />
                                        </TableCell>
                                        <TableCell  sx={{minWidth: '70px', padding: '5px'}}>
                                                <Grid item textAlign="left" marginTop='12px'>
                                                    <FormControl fullWidth>
                                                        <Select
                                                            fullWidth
                                                            onChange={onChange}
                                                            name='status'
                                                            value={data.status}
                                                            variant='standard'
                                                            displayEmpty={true}
                                                            // defaultValue={driver?.status}
                                                            renderValue={() => driver?.status}
                                                        >
                                                            {statuses.map((status, i) => (
                                                                <MenuItem key={i} value={status} sx={{background: backgroundC[i], ":hover": 'none', padding: '7px'}}>{status}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                        </TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>ETA</TableCell>
                                        <TableCell>Ready Time</TableCell>
                                        <TableCell>Notes</TableCell>
                                        <TableCell>
                                            <FormElement
                                                onChange={onChange}
                                                name='phoneNumber'
                                                value={driver?.phoneNumber || ''}
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