import React from "react";
import "./ChatParticipants.css";
import ChatParticipant from "./ChatParticipant/ChatParticipant";

class ChatParticipants extends React.Component
{
    componentDidMount()
    {
        this.props.load_chat_participants(this.props.chat_id, this.props.participance);
    }
    componentWillUnmount()
    {
        this.props.delete_chat_participants();
    }
    render()
    {
        let chat_participants = this.props.chat_participants.map(cur => <ChatParticipant participant_id={cur.id} participant_name={cur.name} participant_surname={cur.surname} img={cur.img} chat_id={this.props.chat_id} participance={this.props.participance} set_chat_participance={this.props.set_chat_participance} grant_options={this.props.grant_options} />);
        return (
            <div className="ChatParticipants">
                {chat_participants}
            </div>
        );
    }
};

export default ChatParticipants;