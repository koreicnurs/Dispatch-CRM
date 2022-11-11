import React from 'react';
import {useSelector} from "react-redux";
import {Box, CssBaseline, Toolbar} from "@mui/material";
import AppToolbar from "../AppToolbar/AppToolbar";
import AppDrawer from "../AppDrawer/AppDrawer";

const Layout = ({children}) => {
    const user = useSelector(state => state.users.user);

    return (
        <>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                {user &&
                    <>
                        <AppToolbar/>
                        <AppDrawer/>
                    </>}
                <Box
                    component="main"
                    sx={{flexGrow: 1, mr: 3}}
                >
                    <Toolbar/>
                    {children}
                </Box>
            </Box>
        </>
    );
};

export default Layout;