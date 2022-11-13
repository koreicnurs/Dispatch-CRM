import React from 'react';
import {Drawer, styled} from "@mui/material";
import {DRAWER_WIDTH} from "../../../constants";
import DrawerContent from "./DrawerContent";
import Logo from "../Logo/Logo";

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    justifyContent: 'center',
}));

const AppDrawer = () => {
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
            variant="permanent"
            anchor="left"
        >
            <DrawerHeader>
                <Logo/>
            </DrawerHeader>
            <DrawerContent/>
        </Drawer>
    );
};

export default AppDrawer;