import React from "react";
import "./MyContacts.css";
import UsersContainer from "../../Users/UsersContainer";

class MyContacts extends React.Component
{
    render()
    {
        let followers = "followers";
        if(this.props.number_of_followers)
            followers = this.props.number_of_followers + " new followers";

        let friends = "friends";
        if(this.props.number_of_friends)
            friends = this.props.number_of_friends + " new friends";

        let contacts_wnd ="";
        if(this.props.is_show_contacts_wnd)
        {
            let params = {...this.props.params};
            params.attach_type = this.props.attach_type;
            contacts_wnd = (
                <div className="contacts_bgr" onClick={()=>this.props.show_contacts_wnd(false)}>
                    <div className="contacts_wnd" onClick={(e)=>e.stopPropagation()}>
                        <UsersContainer params={params} />
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div onClick={()=>this.props.show_contacts_wnd(true, "follows")}> follows </div>
                <div onClick={()=>this.props.show_contacts_wnd(true, "followers")}> {followers} </div>
                <div onClick={()=>this.props.show_contacts_wnd(true, "friends")}> {friends} </div>
                {contacts_wnd}
            </div>
        );
    }
};

export default MyContacts;