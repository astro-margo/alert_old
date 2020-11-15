import React from "react";
import "./Home.css";
import {NavLink} from "react-router-dom";

class Home extends React.Component
{
    render()
    {
        return (
            <div className="Home">
                    <div className="div_with_logo"> Astro-Margo.ru </div>
                    <div className="btn_panel">
                        <NavLink to="/alert/login" className="nav_link"> <div className="btn"> Вход </div> </NavLink>
                        <NavLink to="/alert/newaccount" className="nav_link"> <div className="btn"> Регистрация </div> </NavLink>
                    </div>
            </div>
        );
    }
};

export default Home;