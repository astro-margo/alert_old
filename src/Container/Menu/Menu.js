import React from "react";
import "./Menu.css";
import {NavLink} from "react-router-dom";

class Menu extends React.Component
{
    render()
    {
        let number_of_private_updates = this.props.number_of_comments + this.props.number_of_followers + this.props.number_of_friends;
        let private_updates_label = "";
        if(number_of_private_updates)
            private_updates_label = <div className="menu_update_label"> {number_of_private_updates} </div>;

        let number_of_news = this.props.number_of_news;
        let news_updates_label = "";
        if(number_of_news)
            news_updates_label = <div className="menu_update_label"> {number_of_news} </div>;

        let number_of_chat_updates = this.props.number_of_chats + this.props.number_of_messages;
        let chats_updates_label = "";
        if(number_of_chat_updates)
            chats_updates_label = <div className="menu_update_label"> {number_of_chat_updates} </div>;

        let menu_items = this.props.menu_items.map((cur, i)=>
            <div><NavLink activeClassName="menu_active_link" className="menu_nav_link" exact to={"/alert"+cur.src}> <span className="menu_item"> {cur.name} </span> </NavLink></div>);
        return (
            <div className="Menu">
                <div className="menu_btn">MENU</div>
                <div className="menu_logo">Astro-Margo.ru</div>
                <div className="menu_panel">
                    <div className="menu_nav_div">{private_updates_label}<NavLink activeClassName="menu_active_link" className="menu_nav_link" exact to={"/alert/private/"+this.props.my_id}> <span className="menu_item"> Моя Страница </span> </NavLink></div>
                    <div className="menu_nav_div">{news_updates_label}<NavLink activeClassName="menu_active_link" className="menu_nav_link" exact to={"/alert/news"}> <span className="menu_item"> Новости </span> </NavLink></div>
                    <div className="menu_nav_div">{chats_updates_label}<NavLink activeClassName="menu_active_link" className="menu_nav_link" exact to={"/alert/chats"}> <span className="menu_item"> Чаты </span> </NavLink></div>
                    {menu_items}
                    <div><NavLink activeClassName="menu_active_link" className="menu_nav_link" exact to={"/alert"}> <span className="menu_item" onClick={this.props.quit}> Выйти </span> </NavLink></div>
                </div>
            </div>
        );
    }
};

export default Menu;