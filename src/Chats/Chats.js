import React from "react";
import "./Chats.css";
import NewChatBtnContainer from "./NewChatBtn/NewChatBtnContainer";
import Waiting from "../Waiting/Waiting";
import ChatBox from "./ChatBox/ChatBox";

class Chats extends React.Component
{
    componentDidMount()
    {
        this.props.load_chats();
    }
    componentDidUpdate()
    {
        if(this.props.is_auth === false)
            this.props.history.push("/alert/login");
    }
    componentWillUnmount()
    {
        this.props.delete_chats();
    }
    render()
    {
        let chat_boxes = this.props.chats.map(chat => <ChatBox chat_id={chat.id} user_id={chat.user_id} chat_name={chat.chat_name} participant={chat.participant} my_id={this.props.my_id} inviters={chat.inviters} participants={chat.participants} />);
        return (
            <div className="Chats">
                {this.props.waiting ? <Waiting /> : ""}
                <NewChatBtnContainer />
                {chat_boxes}
            </div>
        );
    }
};

export default Chats;