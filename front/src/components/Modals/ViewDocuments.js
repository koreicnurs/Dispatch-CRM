import React from 'react';
import {TableCell} from "@mui/material";
import ViewerModal from "./ViewerModal";

const ViewDocuments = ({license}) => {
    return (
        <TableCell>
            <ViewerModal
                modalTitle={"Driver license"}
                license={license}
            />
        </TableCell>
    );
};

export default ViewDocuments;