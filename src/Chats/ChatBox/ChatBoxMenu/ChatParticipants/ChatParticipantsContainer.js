import ChatParticipants from "./ChatParticipants";
import {connect} from "react-redux";
import load_chat_participants_thunk from "./load_chat_participants_thunk";
import set_chat_participance_thunk from "./set_chat_participance_thunk";

function mapStateToProps(state)
{
    return {
        chat_participants: state.chats.chat_participants
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        load_chat_participants: (chat_id, participance)=>dispatch(load_chat_participants_thunk(chat_id, participance)),
        delete_chat_participants: ()=>dispatch({type: "CHAT_PARTICIPANTS_DELETE"}),
        set_chat_participance: (chat_id, participant_id, participance, initiated_from)=>dispatch(set_chat_participance_thunk(chat_id, participant_id, participance, initiated_from))
    };
}

const ChatParticipantsContainer = connect(mapStateToProps, mapDispatchToProps)(ChatParticipants);

export default ChatParticipantsContainer;