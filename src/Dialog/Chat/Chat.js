import React from "react";
import Message from "./Message/Message";
import "./Chat.css";
import timestamp_to_string from "../../functions/timestamp_to_string";

class Chat extends React.Component
{
    scroll_down()
    {
        document.getElementById("Chat").scrollTop = document.getElementById("Chat").scrollHeight - document.getElementById("Chat").clientHeight;
    }
    componentDidMount()
    {
        this.props.load_messages(this.props.params, {}, "", {user_id: this.props.match.params.user_id});
    }
    componentDidUpdate()
    {
        if(this.props.is_auth === false)
            this.props.history.push("/alert/login");
        else if(this.props.params.type === "messages")
        {
            setTimeout(this.scroll_down, 1000);
        }
    }
    componentWillUnmount()
    {
        if(this.props.params.type === "comments")
            this.props.remove_dialog("comments", this.props.params.post_id);
        else
            this.props.remove_dialog(this.props.params.type);
    }
    render()
    {
        const style = {};
        if(this.props.params.type === "messages")
        {
            style.overflow = "auto";
        }
        let messages = "";
        if(this.props.messages)
        {
            messages = this.props.messages.map(cur => <Message date={timestamp_to_string(cur.date*1000)} ip={cur.ip} text={cur.text} files={cur.files} my_id={this.props.my_id} user_id={cur.user_id} params={this.props.params} message_id = {cur.id} del_msg={this.props.del_msg} user_name={cur.name} user_surname={cur.surname} recall={cur.recall} msg_type={cur.msg_type} add_to_recall={this.props.add_to_recall} img={cur.img} deletable={cur.deletable} />);
        }
        return (
            <div className="Chat" style={style} id="Chat">
                {messages}
            </div>
        );
    }
};

export default Chat;