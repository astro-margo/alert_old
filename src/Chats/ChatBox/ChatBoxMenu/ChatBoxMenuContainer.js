import ChatBoxMenu from "./ChatBoxMenu";
import {connect} from "react-redux";
import set_chat_participance_thunk from "./ChatParticipants/set_chat_participance_thunk";
import delete_chat_thunk from "./delete_chat_thunk";

function mapStateToProps(state)
{
    return {
        new_messages: state.update_storage.messages
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        set_chat_participance: (chat_id, participant_id, participance, initiated_from)=>dispatch(set_chat_participance_thunk(chat_id, participant_id, participance, initiated_from)),
        delete_chat: (chat_id)=>dispatch(delete_chat_thunk(chat_id))
    };
}

const ChatBoxMenuContainer = connect(mapStateToProps, mapDispatchToProps)(ChatBoxMenu);

export default ChatBoxMenuContainer;