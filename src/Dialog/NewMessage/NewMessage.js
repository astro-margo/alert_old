import React from "react";
import "./NewMessage.css";

class NewMessage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            text: "",
            files: []
        };
        this.on_change_text = this.on_change_text.bind(this);
        this.on_change_file = this.on_change_file.bind(this);
        this.send = this.send.bind(this);
    }
    on_change_text(value)
    {
        this.setState({text: value});
    }
    on_change_file(file_input)
    {
        let files= [...file_input.files];
        this.setState({files: files});
    }
    send()
    {
        this.props.load_messages(this.props.params, this.state, this.props.msg_for_recall, {user_id: this.props.match.params.user_id});
        this.setState({text: "", files: []});
        this.files_val.value="";
        this.props.del_msg_for_recall();
    }
    componentDidUpdate()
    {
        this.textarea_style = {height: `${this.textarea_hidden.offsetHeight + 10}px`};
    }
    render()
    {
        let msg_for_recall_div = this.props.msg_for_recall;
        if(this.props.msg_for_recall)
        {
            msg_for_recall_div = <div> <span> Выделено Сообщение  </span> <div onClick={this.props.del_msg_for_recall} className="del_msg_for_recall"> Удалить </div> </div>;
            
        }
        return (
            <div className="NewMessage">
                <textarea className="new_message_input" value={this.state.text} placeholder="Новое Сообщение" onChange={(e)=>this.on_change_text(e.target.value)} style={this.textarea_style}></textarea>
                <pre className="textarea_hidden" ref={(r)=>this.textarea_hidden=r}>{this.state.text}</pre>
                <input type="file" onChange={(e)=>this.on_change_file(e.target)}  ref={(r)=>this.files_val=r} multiple accept="image/*, video/*, audio/*" />
                <div>{msg_for_recall_div}</div>
                <span className="send_message" onClick={()=>this.send()}> Send </span>
            </div>
        );
    }
};

export default NewMessage;