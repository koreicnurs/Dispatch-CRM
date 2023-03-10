import React from 'react';
import {Drawer, IconButton, styled, useTheme} from "@mui/material";
import DrawerContent from "./DrawerContent";
import Logo from "../Logo/Logo";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronLeft';

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    justifyContent: 'center',
}));

const AppDrawer = (props) => {
    const theme = useTheme();

    return (
        <Drawer
            open={props.open}
            sx={props.styleToggle}
            variant='persistent'
            anchor="left"
        >
            <DrawerHeader
            >
                <Logo/>
                <IconButton
                    onClick={props.close}
                    sx={{
                        display: {sm: 'block', md: 'none'},
                        color: 'rgba(89, 108, 180, 1)',
                    }}
                >
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </DrawerHeader>
            <DrawerContent/>
        </Drawer>
    );
};

export default AppDrawer;