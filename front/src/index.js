import React from 'react';
import {Router} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import {ThemeProvider} from "@mui/material";
import App from './App';
import history from "./history";
import theme from "./theme";
import './index.css';

const app = (
    <ThemeProvider theme={theme}>
        <Router history={history}>
            <App/>
        </Router>
    </ThemeProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);