import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {AppBar, Grid, Toolbar} from "@mui/material";
import logo from '../../../assets/logo.svg';

const useStyles = makeStyles()(theme => ({
    staticToolbar: {
        marginBottom: theme.spacing(2)
    },
}));

const AppToolbar = () => {
    const {classes} = useStyles();

    return (
        <>
            <AppBar position="sticky" color="transparent" elevation={0} sx={{p: 2}}>
                <ToastContainer/>

                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Link to="/">
                                <img src={logo} className="App-logo" alt="logo"/>
                            </Link>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};

export default AppToolbar;