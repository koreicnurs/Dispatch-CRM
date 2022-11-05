import React from "react";
import Drawer from '@mui/material/Drawer';
import Toolbar from "@mui/material/Toolbar";
import {Box} from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {styled} from "@mui/material/styles";
import {Link} from "react-router-dom";

const drawerWidth = 200;

const StyledList = styled(List)({
    color: '#314694',
    fontWeight: '700',
    '& .MuiListItemButton-root': {
        paddingLeft: 50,
    },

    '&& .Mui-selected, && .Mui-selected:hover': {
        backgroundColor: '#314694',
        color: 'white',
    },

    '& .MuiListItemButton-root:hover': {
        backgroundColor: '#596CB4',
        color: 'white',
    },
});

const AppDrawer = () => {
    const menuItems = ['Trips', 'Carriers', 'Drivers', 'Sign Out'];
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        border: 0,  paddingTop: '100px', width: drawerWidth, boxSizing: 'border-box', color: 'primary.main',
                    },
                }}
            >
                <Toolbar/>

                <Box sx={{width: '100%', maxWidth: 200, bgcolor: 'background.paper'}}>
                    <StyledList
                    >
                        <Box sx={{ overflow: 'auto' }}>
                            <List>
                                {menuItems.map((text, index) => (
                                    <ListItemButton
                                    component={Link} to={text.toLowerCase().replaceAll(' ', '')}
                                    selected={selectedIndex === index}
                                    onClick={() => handleListItemClick(index)}
                                >
                                    <ListItemText primaryTypographyProps={{fontWeight: '700'}} primary={text}/>
                                </ListItemButton>
                                ))}
                            </List>
                        </Box>
                    </StyledList>
                </Box>
            </Drawer>
        </>
    );
};

export default AppDrawer;