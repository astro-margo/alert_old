import React from "react";
import "./ChatPage.css";
import Dialog from "../Dialog/Dialog";

class ChatPage extends React.Component
{
    render()
    {
        return (
            <div className="ChatPage">
                <Dialog params={{type: "messages", chat_id: this.props.match.params.chat_id}} />
            </div>
        );
    }
};

export default ChatPage;