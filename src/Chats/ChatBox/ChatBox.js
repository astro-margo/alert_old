import React from "react";
import "./ChatBox.css";
import UserImgContainer from "../../UserImg/UserImgContainer";
import ChatBoxMenuContainer from "./ChatBoxMenu/ChatBoxMenuContainer";

class ChatBox extends React.Component
{
    render()
    {
        let participant_img;
        if(this.props.participant)
        {
            participant_img = (
                <span>
                    <UserImgContainer user_id={this.props.participant.id} img={this.props.participant.img} img_width={"50"} />
                    <div>{this.props.participant.name}</div>
                    <div>{this.props.participant.surname}</div>
                </span>
            );
        }

        let chat_name = "";
        if(this.props.chat_name)
            chat_name = <span className="chat_name"> {this.props.chat_name} </span>;

        let chat_panel = <div>{chat_name}<ChatBoxMenuContainer my_id={this.props.my_id} user_id={this.props.user_id} chat_id={this.props.chat_id} participants={this.props.participants} inviters={this.props.inviters} /></div>;

        return (
            <div className="ChatBox">
                {participant_img}
                {chat_panel}
            </div>
        );
    }
};

export default ChatBox;