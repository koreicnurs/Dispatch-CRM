import React from 'react';
import {Box, CssBaseline} from "@mui/material";
import AppToolbar from "../AppToolbar/AppToolbar";
import AppDrawer from "../AppDrawer/AppDrawer";
import AppMain from "../AppMain/AppMain";

const Layout = ({children}) => {
    return (
        <>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppToolbar/>
                <AppDrawer/>
                <AppMain children={children}/>
            </Box>
        </>
    );
};

export default Layout;