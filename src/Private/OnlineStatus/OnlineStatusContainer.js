import React from "react";
import OnlineStatus from "./OnlineStatus";
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

function OnlineStatusContainer(props)
{
    const ConnectedOnlineStatus = connect(mapStateToProps(props.user_id), mapDispatchToProps)(OnlineStatus);
    return <ConnectedOnlineStatus />;
}

export default OnlineStatusContainer;