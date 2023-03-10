import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {Delete, KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import EditBroker from "../../Modals/EditBroker";
import {deleteBrokerRequest} from "../../../store/actions/brokersActions";

const BrokerTableBodyRow = ({broker, columns}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const onDelete = async (id) => {
        await dispatch(deleteBrokerRequest(id));
    };

    return (
        <>
            <TableRow
                sx={{'& > *':
                {borderBottom: 'unset', background: "white"}}}>
                <TableCell>
                    <IconButton
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                    </IconButton>
                </TableCell>

                {columns.map(column => {
                    if (column.key === 'companiesContract' || column.key === 'arrow') {
                        return null;
                    }
                    if (column.key === 'phoneNumber') {
                        return <TableCell
                            sx={{
                                fontSize: '12px',
                            }}
                            key={column.key}>
                            {broker.phoneNumber.map((number) => (
                                <Box
                                    sx={{
                                        marginBottom: '5px',
                                    }}
                                    key={number}>{number}</Box>
                            ))}
                        </TableCell>
                    }
                    if (column.key === 'description') {
                        return <TableCell
                            sx={{
                                fontSize: '12px',
                                maxWidth: '350px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }}
                            key={column.key}>{broker[column.key]}</TableCell>;
                    }
                    return <TableCell
                        sx={{
                            fontSize: '12px',
                        }}
                        key={column.key}>{broker[column.key]}</TableCell>;
                })}

                <EditBroker brokerID={broker._id}/>
                <TableCell>
                    <IconButton color="primary"
                                onClick={() => onDelete(broker._id)}
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