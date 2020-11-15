import NewMessage from "./NewMessage";
import {connect} from "react-redux";
import load_messages_thunk from "./load_messages_thunk";
import {withRouter} from "react-router-dom";

function mapStateToProps(state)
{
    return {
        msg_for_recall: state.new_message.msg_for_recall
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        load_messages: (params, input, msg_for_recall, query_params)=>dispatch(load_messages_thunk(params, input, msg_for_recall, query_params)),
        del_msg_for_recall: ()=>dispatch({type: "DEL_MSG_FOR_RECALL"})
    };
}

const NewMessageWithRouter = withRouter(NewMessage);
const NewMessageContainer = connect(mapStateToProps, mapDispatchToProps)(NewMessageWithRouter);

export default NewMessageContainer;