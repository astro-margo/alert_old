import React from "react";
import "./AttachBtn.css";

class AttachBtn extends React.Component
{
    componentDidMount()
    {
        
    }
    render()
    {
        let btn_value;
        let btn;
        if(this.props.attach_type === "none") btn_value="Follow";
        if(this.props.attach_type === "follows") btn_value="UnFollow";
        if(this.props.attach_type === "followers") btn_value="Add Friend";
        if(this.props.attach_type === "friends") btn_value="Delete Friend";

        if(this.props.attach_type)
            btn = <div className="private_attach_btn" onClick={()=>this.props.attach(this.props.attach_type, this.props.user_id)}> {btn_value} </div>
        return (
            <div className="AttachBtn">
                {btn}
            </div>
        );
    }
};

export default AttachBtn;