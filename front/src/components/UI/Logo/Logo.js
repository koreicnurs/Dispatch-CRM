import React from 'react';
import logo from "../../../assets/logo.svg";
import {Link} from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/">
            <img src={logo} className="Supreme Dispatch" alt="logo"/>
        </Link>
    );
};

export default Logo;