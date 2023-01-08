import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Box, CssBaseline, Toolbar} from "@mui/material";
import AppToolbar from "../AppToolbar/AppToolbar";
import AppDrawer from "../AppDrawer/AppDrawer";
import {DRAWER_WIDTH} from "../../../constants";

const Layout = ({children}) => {
    const user = useSelector(state => state.users.user);
    const [toggle, setToggle] = useState(true);

    const handleDrawerOpen = () => {
        setToggle(true);
    };

    const handleDrawerClose = () => {
        setToggle(false);
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
                        {toggle === false ? (<AppDrawer
                                styleToggle={{
                                    position: {md: 'static', xs: 'absolute'},
                                    width: DRAWER_WIDTH,
                                    flexShrink: 0,
                                    '& .MuiDrawer-paper': {
                                        width: DRAWER_WIDTH,
                                        boxSizing: 'border-box',
                                        border: 0
                                    },
                                }}
                                open={toggle}
                                close={() => handleDrawerClose()}
                            />)
                            : (<AppDrawer
                                styleToggle={{
                                    position: {md: 'static', xs: 'absolute'},
                                    width: DRAWER_WIDTH,
                                    flexShrink: 0,
                                    '& .MuiDrawer-paper': {
                                        width: DRAWER_WIDTH,
                                        boxSizing: 'border-box',
                                        border: 0
                                    },
                                }}
                                open={toggle}
                                close={() => handleDrawerClose()}
                            />)
                        }

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