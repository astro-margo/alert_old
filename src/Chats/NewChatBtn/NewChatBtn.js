import React from "react";
import "./NewChatBtn.css";

class NewChatBtn extends React.Component
{
    render()
    {
        return (
            <div className="NewChatBtn" onClick={this.props.new_chat}>
                Новый Чат
            </div>
        );
    }
};

export default NewChatBtn;