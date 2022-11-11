import React from 'react';
import {useSelector} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {AppBar, Avatar, Grid, Stack, Toolbar, Typography} from "@mui/material";
import {DRAWER_WIDTH} from "../../../constants";
import {apiUrl} from "../../../config";
import defaultAvatar from "../../../assets/default-avatar.png";

const AppToolbar = () => {
    const user = useSelector(state => state.users.user);

    let avatarImage = defaultAvatar;

    if (user.avatar) {
        avatarImage = apiUrl + '/' + user.avatar;
    }
    return (
        <AppBar
            position="fixed"
            sx={{width: `calc(100% - ${DRAWER_WIDTH}px)`, ml: `${DRAWER_WIDTH}px`, mr: 3}}
            color="transparent"
            elevation={0}
        >
            <ToastContainer/>
            <Toolbar>
                <Grid container justifyContent="flex-end" alignItems="center">
                    <Grid item>
                        <Stack direction="row" spacing={1} color="inherit">
                            <Avatar alt={user.displayName} src={avatarImage}
                                    sx={{width: 32, height: 32, mr: 1}}/>
                            <Typography variant="button" noWrap>
                                Hello, {user.displayName}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;