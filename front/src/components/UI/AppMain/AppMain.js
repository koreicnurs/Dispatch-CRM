import React from 'react';
import {styled} from "@mui/material";
import {useSelector} from "react-redux";
import {DRAWER_WIDTH} from "../../../constants";

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${DRAWER_WIDTH}px`,
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
        <Main open={open} sx={{flexGrow: 1, marginTop: '120px'}}>
            {children}
        </Main>
    );
};

export default AppMain;