import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Drawer, Grid, IconButton, styled, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import {DRAWER_WIDTH} from "../../../constants";
import DrawerContent from "./DrawerContent";
import {handleDrawer} from "../../../store/actions/drawerActions";
import Logo from "../Logo/Logo";

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1,2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const AppDrawer = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.drawer.drawerOpen);

    const handleDrawerClose = () => {
        dispatch(handleDrawer(false));
    };

    return (
        <Drawer
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box',
                    border: 0
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader sx={{height: 120}}>
                <Grid container justifyContent={"space-between"}>
                    <Grid item>
                        <Logo/>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={handleDrawerClose}>
                            <Close sx={{color: 'primary.dark'}}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </DrawerHeader>

            <Typography sx={{ fontWeight: '900', textAlign: 'center', p: 2}}>
                Turan Express Inc
            </Typography>

            <DrawerContent/>

        </Drawer>
    );
};

export default AppDrawer;