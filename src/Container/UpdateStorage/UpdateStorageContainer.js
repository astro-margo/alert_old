import UpdateStorage from "./UpdateStorage";
import {connect} from "react-redux";
import get_updates_thunk from "./get_updates_thunk";

function mapStateToProps(state)
{
    return {
        comments: state.chat.comments_displayed,
        messages: state.chat.chat_displayed,
        chats: state.chats.chats_displayed,
        chat_users_ids: state.chat.users_ids,
        users_ids: state.users.users_ids,
        private_cur_user_id: state.private.cur_user_id,
        chatbox_users_ids: state.chats.chatbox_users_ids,
        chat_participants_ids: state.chats.chat_participants_ids
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        get_updates: (online, display, users_ids)=>dispatch(get_updates_thunk(online, display, users_ids))
    };
}

const UpdateStorageContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateStorage);

export default UpdateStorageContainer;