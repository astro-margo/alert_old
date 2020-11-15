import React from "react";
import {NavLink} from "react-router-dom";

class AuthNav extends React.Component
{
    render()
    {
        return (
            <div className="AuthNav">
                <NavLink to="/alert/login" className="auth_nav" activeClassName="active_auth_nav"><div className="auth_nav_div">Войти</div></NavLink>
                <NavLink to="/alert/newaccount" className="auth_nav" activeClassName="active_auth_nav"><div className="auth_nav_div">Регистрация</div></NavLink>
            </div>
        );
    }
};

export default AuthNav;