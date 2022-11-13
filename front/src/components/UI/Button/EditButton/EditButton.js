import React from 'react';
import {Grid} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const EditButton = ({click}) => {
    return (
        <Grid item onClick={click} sx={{cursor: "pointer"}}>
            <EditIcon  sx={{ fontSize: 34 }} />
        </Grid>
    );
};

export default EditButton;