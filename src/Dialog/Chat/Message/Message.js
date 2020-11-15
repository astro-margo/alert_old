import React from "react";
import "./Message.css";
import Media from "./Media";
import Dialog from "../../Dialog";
import timestamp_to_string from "../../../functions/timestamp_to_string";
import RecallRef from "./RecallRef/RecallRef";
import MsgMenuPanel from "./MsgMenuPanel/MsgMenuPanel";
import UserImgContainer from "../../../UserImg/UserImgContainer";

class Message extends React.Component
{
    render()
    {
        let files;
        if(this.props.files)
            files = this.props.files.map(file => <Media f_type={file.type} url={file.url} m_type={this.props.params.type} />);

        let recall;
        if(this.props.recall !== "none")
        {
            const recall_props = this.props.recall;
            recall = <Message date={timestamp_to_string(recall_props.date*1000)} ip={recall_props.ip} text={recall_props.text} files={recall_props.files} user_id={recall_props.user_id} message_id={recall_props.id} user_name={recall_props.name} user_surname={recall_props.surname} img={recall_props.img} recall={"none"} recall_backtrace={recall_props.recall_backtrace} recalled_msg={true} params={this.props.params} msg_type={recall_props.msg_type} add_to_recall={this.props.add_to_recall} />
        }

        let msg_menu_panel = ""; //

        let recall_btn = <span onClick={()=>this.props.add_to_recall(this.props.msg_type, this.props.message_id)}>{">"}</span>;

        let del_msg_btn="";
        if(this.props.deletable)
        {
            del_msg_btn = <span onClick={()=>this.props.del_msg(this.props.params, this.props.message_id)}>X</span>;
            msg_menu_panel = <MsgMenuPanel>{[recall_btn, del_msg_btn]}</MsgMenuPanel>;
        }
        else
            msg_menu_panel = <MsgMenuPanel>{[recall_btn]}</MsgMenuPanel>;

        let recalled_style = {};
        let recall_backtrace = [];
        if(this.props.recalled_msg)
        {
            recalled_style = {width: "90%"};
            recall_backtrace = this.props.recall_backtrace.map(cur => <RecallRef msg_data={cur} params={this.props.params} add_to_recall={this.props.add_to_recall} />);
        }

        return (
            <div className="Message" style={recalled_style}>
                {msg_menu_panel}
                <div>
                    <UserImgContainer user_id={this.props.user_id} img={this.props.img} img_width={50} />
                    <span>
                        <span>{this.props.user_name}</span><br />
                        <span>{this.props.user_surname}</span>
                    </span>
                </div>
                <div>{this.props.date}</div>
                <div>{this.props.ip}</div>
                {recall}
                <div>{this.props.text}</div>
                <div>
                    {files}
                </div>
                {recall_backtrace}
                { ((this.props.params.type === "posts" || this.props.params.type === "news") && !this.props.recalled_msg && !this.props.recall_window) ? <Dialog params={{type: "comments", post_id: this.props.message_id}} /> : "" }
            </div>
        );
    }
};

export default Message;