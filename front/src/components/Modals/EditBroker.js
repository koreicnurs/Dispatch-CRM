import React from 'react';
import {TableCell} from "@mui/material";
import BrokersModal from "./BrokersModal";

const EditBroker = ({brokerID}) => (
    <TableCell>
        <BrokersModal
            modalTitle={"Edit broker"}
            brokerID={brokerID}
        />
    </TableCell>
);

export default EditBroker;