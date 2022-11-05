import React from 'react';
import {Grid, IconButton, styled, Toolbar} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import {Link} from "react-router-dom";
import logo from "../../../assets/logo.svg";
import {DragHandle} from "@mui/icons-material";
import {handleDrawer} from "../../../store/actions/drawerActions";
import {useDispatch, useSelector} from "react-redux";

const drawerWidth = 200;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
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
        <AppBar position="fixed" open={open} color="transparent" elevation={0}>
            <Toolbar>
                <Grid container sx={{mr: 2, paddingTop: 1, ...(open && {display: 'none'})}}>
                    <Grid item>
                        <Link to="/">
                            <img src={logo} className="Supreme Dispatch" alt="logo"/>
                        </Link>
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