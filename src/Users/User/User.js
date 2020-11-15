import React from "react";
import "./User.css";
import UserImgContainer from "../../UserImg/UserImgContainer";

class Users extends React.Component
{
    render()
    {
        let attach_btn_value="";
        let attach_btn = "";
        if(this.props.attach_type)
        {
            if(this.props.attach_type === "none") attach_btn_value="Follow";
            if(this.props.attach_type === "follows") attach_btn_value="UnFollow";
            if(this.props.attach_type === "followers") attach_btn_value="Add Friend";
            if(this.props.attach_type === "friends") attach_btn_value="Delete Friend";
            attach_btn = <div className="attach_btn" onClick={()=>this.props.attach(this.props.attach_type, this.props.user_id, this.props.params)}> {attach_btn_value} </div>
        }
        return (
            <div className="User">
                <UserImgContainer img={this.props.img} user_id={this.props.user_id} img_width={100} />
                <div>
                    <div> {this.props.user_name} </div>
                    <div> {this.props.user_surname} </div>
                    <div> {this.props.attach_type} </div>
                    {attach_btn}
                </div>
            </div>
        );
    }
};

export default Users;