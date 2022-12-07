import React, {useState, useEffect} from 'react';
import {Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {Delete, KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import EditBroker from "../../Modals/EditBroker";
// import {useDispatch} from "react-redux";
// import {deleteBrokerRequest, fetchBrokersRequest} from "../../../store/actions/brokersActions";

const BrokerTableBodyRow = ({broker, columns}) => {
    // const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     dispatch(fetchBrokersRequest());
    // }, [dispatch, broker]);
    //
    // const onDelete = async (id) => {
    //     await dispatch(deleteBrokerRequest(id));
    //     await dispatch(fetchBrokersRequest());
    // };

    return (
        <>
            <TableRow
                sx={{'& > *': {borderBottom: 'unset', background: "white"}}}>
                <TableCell>
                    <IconButton
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                    </IconButton>
                </TableCell>
                {/*<TableCell>{broker.name}</TableCell>*/}
                {/*<TableCell>{broker.phoneNumber}</TableCell>*/}
                {/*<TableCell>{broker.mc}</TableCell>*/}
                {/*<TableCell>{broker.description}</TableCell>*/}

                {columns.map(column => {
                    if (column.key === 'companiesContract' || column.key === 'arrow') {
                        return null;
                    }
                    if (column.key === 'phoneNumber') {
                        return <TableCell key={column.key}>
                            {broker.phoneNumber.map((number) => (
                                <Box key={number}>{number}</Box>
                            ))}
                        </TableCell>
                    }
                    return <TableCell key={column.key}>{broker[column.key]}</TableCell>;
                })}

                <EditBroker brokerID={broker._id}/>
                <TableCell>
                    <IconButton color="primary"
                                // onClick={()=>onDelete(broker._id)}
                    >
                        <Delete/>
                    </IconButton>
                </TableCell>
            </TableRow>

            <TableRow sx={{background: "white"}}>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Carriers
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Company name</TableCell>
                                        <TableCell>Phone Number</TableCell>
                                        <TableCell>MC</TableCell>
                                        <TableCell>DOT</TableCell>
                                        <TableCell>FED-ID</TableCell>
                                        <TableCell>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {broker.companiesContract.map((itemRow) => (
                                        <TableRow key={itemRow._id}>
                                            <TableCell>{itemRow.title}</TableCell>
                                            <TableCell>{itemRow.phoneNumber}</TableCell>
                                            <TableCell>{itemRow.mc}</TableCell>
                                            <TableCell>{itemRow.fedid}</TableCell>
                                            <TableCell>{itemRow.dot}</TableCell>
                                            <TableCell>{itemRow.description}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default BrokerTableBodyRow;