import React from "react";
import "./ChatParticipant.css";
import UserImgContainer from "../../../../../UserImg/UserImgContainer";

class ChatParticipant extends React.Component
{
    render()
    {
        let btn_value;
        let dest_participance;

        if(this.props.participance === "none")
        {
            btn_value = "Invite";
            dest_participance = "inviters";
        }
        if(this.props.participance === "participants")
        {
            btn_value = "Delete Participant";
            dest_participance = "delete_participant";
        }
        if(this.props.participance === "inviters")
        {
            btn_value = "Cancel Invitation";
            dest_participance = "delete_inviter";
        }

        let set_participance_btn = "";
        if(this.props.grant_options)
            set_participance_btn = <div className="set_participance_btn" onClick={()=>this.props.set_chat_participance(this.props.chat_id, this.props.participant_id, dest_participance, {type: "participants", participance: this.props.participance})}> {btn_value} </div>;
        return (
            <div className="ChatParticipant">
                <div>
                    <UserImgContainer user_id={this.props.participant_id} img={this.props.img} img_width="100" />
                </div>
                <div>
                    <div>
                       <span> {this.props.participant_name} </span>
                        <span> {this.props.participant_surname} </span>
                    </div>
                    {set_participance_btn}
                </div>
            </div>
        );
    }
};

export default ChatParticipant;