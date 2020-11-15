import {connect} from "react-redux";
import Chat from "./Chat";
import load_messages_thunk from "../NewMessage/load_messages_thunk";
import React from "react";
import del_msg_thunk from "./del_msg_thunk";
import {withRouter} from "react-router-dom";

function mapStateToProps(params)
{
    return function(state)
    {
        let data;
        if((params.type === "posts") || (params.type === "messages") || (params.type === "news"))
            data = state.chat[params.type];
        if(params.type === "comments")
            data = state.chat[params.type][params.post_id];
        return {
            messages: data,
            my_id: state.auth.my_id,
            is_auth: state.auth.is_auth
        };
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        load_messages: (params, input, files, query_params)=>dispatch(load_messages_thunk(params, input, files, query_params)),
        remove_dialog: (type, post_id=0)=>dispatch({type: "REMOVE_DIALOG", param_type: type, post_id}),
        del_msg: (params, id)=>dispatch(del_msg_thunk(params, id)),
        add_to_recall: (msg_type, msg_id)=>dispatch({type: "ADD_TO_RECALL", msg_type, msg_id})
    };
}

function ChatContainer(props)
{
    const ChatWithRouter = withRouter(Chat);
    const ConnectedChatContainer = connect(mapStateToProps(props.params), mapDispatchToProps)(ChatWithRouter);
    return <ConnectedChatContainer params={props.params} />;
}

export default ChatContainer;