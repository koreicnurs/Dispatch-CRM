import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Box, CssBaseline, Toolbar} from "@mui/material";
import AppToolbar from "../AppToolbar/AppToolbar";
import AppDrawer from "../AppDrawer/AppDrawer";

const Layout = ({children}) => {
    const user = useSelector(state => state.users.user);
    const [toggle, setToggle] = useState(false);

    const handleDrawerOpen = () => {
        setToggle(true);
        console.log(toggle);
    };

    const handleDrawerClose = () => {
        setToggle(false);
        console.log(toggle);
    };

    return (
        <>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                {user &&
                    <>
                        <AppToolbar
                            burgerBtn={() => handleDrawerOpen()}
                        />
                        <AppDrawer
                            open={toggle}
                            close={() => handleDrawerClose()}
                        />
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