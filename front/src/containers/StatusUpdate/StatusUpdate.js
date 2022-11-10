import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchDriversRequest} from "../../store/actions/driversActions";
import {makeStyles} from "tss-react/mui";
import {Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import {fetchCarriersRequest} from "../../store/actions/carriersActions";

const useStyles = makeStyles()(() => ({
    innerContainer: {
        background: '#f0f2fe',
        height: "100vh",
        paddingLeft: "15px",
        paddingBottom: "15px",
        paddingTop: "15px"
    }
}));

const StatusUpdate = () => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const carriers = useSelector(state => state.carriers.drivers);
    const drivers = useSelector(state => state.drivers.drivers);

    useEffect(() => {
        dispatch(fetchCarriersRequest());
        dispatch(fetchDriversRequest());
    }, [dispatch]);

    return (
        <Box className={classes.innerContainer}>
            <Grid
                container
                direction='column'

            >
                <Grid item marginBottom='20px'>
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
                                {drivers.map(driver => (
                                    <TableRow key={driver._id}>
                                        <TableCell>{driver.companyId.title}</TableCell>
                                        <TableCell>{driver.name}</TableCell>
                                        <TableCell>{driver.status}</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>ETA</TableCell>
                                        <TableCell>Ready Time</TableCell>
                                        <TableCell>Notes</TableCell>
                                        <TableCell>{driver.phoneNumber}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StatusUpdate;