import React from 'react';
import {Link} from "react-router-dom";
import {
    Box,
    CssBaseline,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    styled,
    Toolbar
} from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import {Close, DragHandle} from "@mui/icons-material";
import logo from '../../../assets/logo.svg';
import {useDispatch, useSelector} from "react-redux";
import {handleDrawer} from "../../../store/actions/drawerActions";

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

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const StyledList = styled(List)(({theme}) => ({
    color: theme.palette.primary.main,
    '& .MuiListItemButton-root': {
        paddingLeft: 50,
    },
    '&& .Mui-selected, && .Mui-selected:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
    },
    '& .MuiListItemButton-root:hover': {
        backgroundColor: theme.palette.primary.light,
        color: 'white',
    },
}));

const Layout = ({children}) => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.drawer.drawerOpen);

    // const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        // setOpen(true);
        dispatch(handleDrawer(true));
    };

    const handleDrawerClose = () => {
        // setOpen(false);
        dispatch(handleDrawer(false));
    };

    const menuItems = ['Trips', 'Carriers', 'Drivers', 'Sign Out'];
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="fixed" open={open} color="transparent" elevation={1}>
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

                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            border: 0
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <Grid container justifyContent={"space-between"}>
                            <Grid item>
                                <Link to="/">
                                    <img src={logo} className="Supreme Dispatch" alt="logo"/>
                                </Link>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={handleDrawerClose}>
                                    <Close sx={{color: 'primary.dark'}}/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </DrawerHeader>

                    <StyledList>
                        {menuItems.map((text, index) => (
                            <ListItemButton key={text}
                                            component={Link} to={text.toLowerCase().replaceAll(' ', '')}
                                            selected={selectedIndex === index}
                                            onClick={() => handleListItemClick(index)}
                            >
                                <ListItemText primaryTypographyProps={{fontWeight: '700'}} primary={text}/>
                            </ListItemButton>
                        ))}
                    </StyledList>

                </Drawer>

                <Main open={open}>
                    <DrawerHeader/>
                    {/*<Box sx={{height: '110px'}}/>*/}
                    {/*    <Box component="main" sx={{flexGrow: 1, paddingTop: 4}}>*/}
                    {/*        <Toolbar/>*/}
                    {children}
                    {/*    </Box>*/}
                </Main>
            </Box>
        </>
    );
};

export default Layout;