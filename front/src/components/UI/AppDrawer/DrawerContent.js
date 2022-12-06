import React, {useEffect, useMemo} from 'react';
import {List, ListItemButton, ListItemText, styled} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
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
        {title:'Status Update', route:  '/status_update'},
        {title:'Trips', route:  '/loads/?status=upcoming'},
        {title: 'Carriers', route: '/carriers'},
        {title: 'Drivers', route: '/drivers'},
        {title: 'Brokers', route: '/brokers'},
        {title: 'My Profile', route: '/my_profile'},
        {title: 'Dispatchers', route: '/dispatchers'},
    ], []);

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    useEffect(() => {
        const path = window.location.pathname;
        const index = menuItems.findIndex(text => text.route === path);
        setSelectedIndex(index);
    }, [dispatch, menuItems]);

    const user = useSelector(state => state.users.user);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        if (index === menuItems.length){
            dispatch(logoutRequest());
        }
    };

    const listItem = (title, index, route) => (
      <ListItemButton key={title}
                      component={Link} to={route}
                      selected={selectedIndex === index}
                      onClick={() => handleListItemClick(index)}
      >
          <ListItemText primaryTypographyProps={{fontWeight: '700'}} primary={title}/>
      </ListItemButton>
    );

    return (
        <StyledList>
            {menuItems.map((text, index) => {
                if (text.title !== "Dispatchers") {
                    return listItem(text.title, index, text.route);
                } else {
                    if (user.role === "admin") {
                        return listItem(text.title, index, text.route);
                    } else {
                        return null;
                    }
                }
            })}
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