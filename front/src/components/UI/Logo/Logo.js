import React from 'react';
import logo from "../../../assets/logo.svg";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Logo = () => {
    const user = useSelector(state => state.users.user);

    return (
        <Link to={user?.role === 'carrier' ? '/carrier-loads' : '/loads/?status=upcoming'}>
            <img src={logo} className="Supreme Dispatch" alt="logo"/>
        </Link>
    );
};

export default Logo;