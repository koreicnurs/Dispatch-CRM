import React from 'react';
import {Box, styled, Toolbar} from "@mui/material";
import {useSelector} from "react-redux";

const drawerWidth = 200;
const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppMain = ({children}) => {
    const open = useSelector(state => state.drawer.drawerOpen);

    return (

        <Main open={open}>
            <Box component="main" sx={{flexGrow: 1, paddingTop: 4}}>
                <Toolbar/>
                {children}
            </Box>
        </Main>
    );
};

export default AppMain;