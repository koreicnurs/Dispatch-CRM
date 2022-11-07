import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, IconButton, styled, Toolbar} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import {DragHandle} from "@mui/icons-material";
import Logo from "../Logo/Logo";
import {handleDrawer} from "../../../store/actions/drawerActions";
import {DRAWER_WIDTH} from "../../../constants";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: `${DRAWER_WIDTH}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const AppToolbar = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.drawer.drawerOpen);

    const handleDrawerOpen = () => {
        dispatch(handleDrawer(true));
    };

    return (
        <AppBar position="fixed" open={open} color="transparent" elevation={0} sx={{height: 120}}>
            <Toolbar>
                <Grid container sx={{mr: 2, paddingTop: 1, ...(open && {display: 'none'})}}>
                    <Grid item>
                        <Logo/>
                    </Grid>
                    <Grid item>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                        >
                            <DragHandle sx={{color: 'primary.dark'}}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;