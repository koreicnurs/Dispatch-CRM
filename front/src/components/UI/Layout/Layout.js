import React from 'react';
import {useSelector} from "react-redux";
import {Box, CssBaseline} from "@mui/material";
import AppToolbar from "../AppToolbar/AppToolbar";
import AppDrawer from "../AppDrawer/AppDrawer";
import AppMain from "../AppMain/AppMain";

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
                <AppMain children={children}/>
            </Box>
        </>
    );
};

export default Layout;