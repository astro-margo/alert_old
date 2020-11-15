import React from "react";
import UserImg from "./UserImg";
import {connect} from "react-redux";

function mapStateToProps(user_id)
{
    return function(state)
    {
        return {
            online: state.update_storage.user_id_to_online[user_id]
        };
    };
}

function mapDispatchToProps(dispatch)
{
    return {
    };
}

function UserImgContainer(props)
{
    const ConnectedUserImg = connect(mapStateToProps(props.user_id), mapDispatchToProps)(UserImg);
    return <ConnectedUserImg user_id={props.user_id} img={props.img} img_width={props.img_width} />;
}

export default UserImgContainer;