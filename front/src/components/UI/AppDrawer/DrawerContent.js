import React, {useEffect, useMemo} from 'react';
import {List, ListItemButton, ListItemText, styled} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutRequest} from "../../../store/actions/usersActions";

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
    const dispatch = useDispatch();

    const menuItems = useMemo(() => [
        {title:'Trips', route:  '/trips'},
        {title: 'Carriers', route: '/carriers'},
        {title: 'Drivers', route: '/drivers'}
    ], [])

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    useEffect(() => {
        const path = window.location.pathname;
        const index = menuItems.findIndex(text => text.route === path);
        setSelectedIndex(index);
    }, [dispatch, menuItems]);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        if (index === menuItems.length){
            dispatch(logoutRequest());
        }
    };

    return (
        <StyledList>
            {menuItems.map((text, index) => (
                <ListItemButton key={text.title}
                                component={Link} to={text.route}
                                selected={selectedIndex === index}
                                onClick={() => handleListItemClick(index)}
                >
                    <ListItemText primaryTypographyProps={{fontWeight: '700'}} primary={text.title}/>
                </ListItemButton>
            ))}
            <ListItemButton
                            component={Link} to="/login"
                            selected={selectedIndex === menuItems.length}
                            onClick={() => handleListItemClick(menuItems.length)}
            >
                <ListItemText primaryTypographyProps={{fontWeight: '700'}} primary='Sign Out'/>
            </ListItemButton>
        </StyledList>
    );
};

export default DrawerContent;