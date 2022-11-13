import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchDriversRequest} from "../../store/actions/driversActions";
import {makeStyles} from "tss-react/mui";
import {Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";

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
    const allDrivers = useSelector(state => state.drivers.drivers);

    useEffect(() => {
        dispatch(fetchDriversRequest());
    }, [dispatch]);

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
                                {allDrivers.map(driver => (
                                    <TableRow key={driver._id}>
                                        <TableCell sx={{minWidth: '150px', padding: '5px'}}>
                                            {driver.companyId.title}
                                        </TableCell>
                                        <TableCell sx={{minWidth: '100px', padding: '5px'}}>
                                            {driver.name}
                                        </TableCell>
                                        <TableCell  sx={{minWidth: '70px', padding: '5px'}}>
                                            {driver.status}
                                        </TableCell>
                                        <TableCell sx={{display: 'flex'}} >
                                            {driver.pickUp} >> {driver.delivery}
                                        </TableCell>
                                        <TableCell sx={{padding: '5px'}}>
                                            {driver.ETA}
                                        </TableCell>
                                        <TableCell sx={{padding: '5px'}}>
                                            {driver.readyTime}
                                        </TableCell>
                                        <TableCell sx={{padding: '5px'}}>
                                            {driver.notes }
                                        </TableCell>
                                        <TableCell sx={{padding: '5px'}}>
                                            {driver.phoneNumber}
                                        </TableCell>
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