import React from 'react';
import {Drawer, Grid, IconButton, List, ListItemButton, ListItemText, styled} from "@mui/material";
import {Link} from "react-router-dom";
import logo from "../../../assets/logo.svg";
import {Close} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {handleDrawer} from "../../../store/actions/drawerActions";

const drawerWidth = 200;
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

const AppDrawer = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.drawer.drawerOpen);

    const handleDrawerClose = () => {
        dispatch(handleDrawer(false));
    };

    const menuItems = ['Trips', 'Carriers', 'Drivers', 'Sign Out'];
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    return (
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
    );
};

export default AppDrawer;