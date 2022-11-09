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
        paddingLeft: "15px",
        paddingBottom: "15px",
        paddingTop: "15px"
    }
}));

const StatusUpdate = () => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const drivers = useSelector(state => state.drivers.drivers);

    useEffect(() => {
        dispatch(fetchDriversRequest());
    }, [dispatch]);

    return (
        <Box className={classes.innerContainer}>
            <Grid
                container
                direction='column'

            >
                <Grid item>
                    <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
                        Carriers
                    </Typography>
                </Grid>
                <Grid item>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={3}>
                                        Details
                                    </TableCell>
                                    <TableCell align="right">Price</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Desc</TableCell>
                                    <TableCell align="right">Qty.</TableCell>
                                    <TableCell align="right">Unit</TableCell>
                                    <TableCell align="right">Sum</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {drivers.map((driver) => (
                                    <TableRow key={row.desc}>
                                        <TableCell>{row.desc}</TableCell>
                                        <TableCell align="right">{row.qty}</TableCell>
                                        <TableCell align="right">{row.unit}</TableCell>
                                        <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={2}>Subtotal</TableCell>
                                    <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tax</TableCell>
                                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                                    <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
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