import React from 'react';
import {List, ListItemButton, ListItemText, styled} from "@mui/material";
import {Link} from "react-router-dom";

const StyledList = styled(List)(({theme}) => ({
    color: theme.palette.primary.main,
    '& .MuiListItemButton-root': {
        paddingLeft: 50,
    },
    '&& .Mui-selected, && .Mui-selected:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    '& .MuiListItemButton-root:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
    },
}));

const DrawerContent = () => {
    const menuItems = ['Trips', 'Carriers', 'Drivers', 'Sign Out'];
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    return (
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
    );
};

export default DrawerContent;