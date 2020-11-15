import React from "react";
import "./RecallWindow.css";
import Message from "../../Message";
import timestamp_to_string from "../../../../../functions/timestamp_to_string";

class RecallWindow extends React.Component
{
    render()
    {
        const msg_data = this.props.msg_data;
        return (
            <div className="RecallWindow" onClick={this.props.close_recall_window}>
                <div className="recall_window_content" onClick={(e)=>e.stopPropagation()}>
                    <Message date={timestamp_to_string(msg_data.date*1000)} ip={msg_data.ip} text={msg_data.text} files={msg_data.files} user_id={msg_data.user_id} message_id={msg_data.id} user_name={msg_data.name} user_surname={msg_data.surname} img={msg_data.img} recall={"none"} params={this.props.params} recall_window={true} msg_type={msg_data.msg_type} add_to_recall={this.props.add_to_recall} />
                </div>
            </div>
        );
    }
};

export default RecallWindow;