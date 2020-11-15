import React from "react";
import "./ChatBoxMenu.css";
import ChatParticipantsContainer from "./ChatParticipants/ChatParticipantsContainer";
import {NavLink} from "react-router-dom";

class ChatBoxMenu extends React.Component
{
    constructor(props)
    {
        super(props);
        this.show_menu = this.show_menu.bind(this);
        this.chatbox_menu_wnd = this.chatbox_menu_wnd.bind(this);
        this.state = {
            show_menu: false,
            chatbox_wnd: ""
        };
    }
    chatbox_menu_wnd(option)
    {
        this.show_menu(false);
        let chatbox_wnd="";
        if(option === "participants" || option === "inviters" || option === "none")
        {
            chatbox_wnd = (
                <div className="chatbox_wnd_bgr" onClick={()=>this.chatbox_menu_wnd("")} onMouseOver={(e)=>e.stopPropagation()} onMouseOut={(e)=>e.stopPropagation()}>
                    <div className="chatbox_wnd" onClick={(e)=>e.stopPropagation()}>
                        <ChatParticipantsContainer participance={option} chat_id={this.props.chat_id} grant_options={this.props.my_id === this.props.user_id} />
                    </div>
                </div>
            );
        }
        this.setState({chatbox_wnd: chatbox_wnd});
    }
    show_menu(status)
    {
        this.setState({show_menu: status});
    }
    render()
    {
        let menu_style;
        if(this.state.show_menu)
        {
            menu_style = {
                height: "auto",
                opacity: "1"
            };
        }
        else
        {
            menu_style = {
                height: "0",
                opacity: "0"
            };
        }

        let menu_items;
        let new_chat = false;
        if(this.props.my_id === this.props.user_id)
        {
            menu_items = (
                <div>
                    <div className="chatbox_menu_item"> <NavLink to={"/alert/chats/" + this.props.chat_id} className="goto_chat_nav"><div>Войти В Чат</div></NavLink> </div>
                    <div className="chatbox_menu_item" onClick={()=>this.chatbox_menu_wnd("participants")}> Участники </div>
                    <div className="chatbox_menu_item" onClick={()=>this.chatbox_menu_wnd("inviters")}> Приглашенные </div>
                    <div className="chatbox_menu_item" onClick={()=>this.chatbox_menu_wnd("none")}> Пригласить </div>
                    <div className="chatbox_menu_item" onClick={()=>this.props.delete_chat(this.props.chat_id)}> Удалить Чат </div>
                </div>
            );
        }
        else if(this.props.inviters.indexOf(this.props.my_id) !== -1)
        {
            new_chat = true;
            menu_items = (
                <div>
                    <div className="chatbox_menu_item" onClick={()=>this.chatbox_menu_wnd("participants")}> Участники </div>
                    <div className="chatbox_menu_item" onClick={()=>this.props.set_chat_participance(this.props.chat_id, this.props.my_id, "participants", {type: "chatbox"})}> Вступить в чат </div>
                    <div className="chatbox_menu_item" onClick={()=>this.props.set_chat_participance(this.props.chat_id, this.props.my_id, "delete_inviter", {type: "chatbox"})}> Отклонить Чат </div>
                </div>
            );
        }
        else if(this.props.participants.indexOf(this.props.my_id) !== -1)
        {
            menu_items = (
                <div>
                    <div className="chatbox_menu_item"> <NavLink to={"/alert/chats/" + this.props.chat_id} className="goto_chat_nav"><div>Войти В Чат</div></NavLink> </div>
                    <div className="chatbox_menu_item" onClick={()=>this.chatbox_menu_wnd("participants")}> Участники </div>
                    <div className="chatbox_menu_item" onClick={()=>this.props.set_chat_participance(this.props.chat_id, this.props.my_id, "delete_participant", {type: "chatbox"})}> Покинуть Чат </div>
                </div>
            );
        }

        let menu_btn;
        if(new_chat)
            menu_btn = <div className="new_chat"> Новый Чат </div>;
        else if(this.props.new_messages.indexOf(this.props.chat_id) !== -1)
            menu_btn = <div className="new_chat"> Новые Сообщения </div>;
        else
            menu_btn = <div className="chat_menu_btn">Chat Menu</div>

        return (
            <div className="ChatBoxMenu" onMouseOver={()=>this.show_menu(true)} onMouseOut={()=>this.show_menu(false)}>
                {menu_btn}
                <div className="chat_menu" style={menu_style}> 
                    {menu_items}
                </div>
                {this.state.chatbox_wnd}
            </div>
        );
    }
};

export default ChatBoxMenu;