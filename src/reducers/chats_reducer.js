const default_state = {
    chats: [],
    waiting: false,
    chat_participants: [],
    chats_displayed: [],

    chatbox_users_ids: [],
    chat_participants_ids: []
};

function get_chatbox_users_ids(chats)
{
    let chatbox_users_ids = [];
    for(let chat of chats)
    {
        if(chat.participant)
            chatbox_users_ids.push(chat.participant.id);
    }
    return chatbox_users_ids;
}

function get_chat_participants_users_ids(chat_participants)
{
    let chatbox_users_ids = [];
    for(let chat_participant of chat_participants)
    {
        chatbox_users_ids.push(chat_participant["id"]);
    }
    return chatbox_users_ids;
}

function chats_reducer(state = default_state, action)
{
    if(action.type === "CHATS_WAIT")
    {
        let new_state = {...state};
        new_state.waiting = true;
        return new_state;
    }
    if(action.type === "CHATS_RECEIVED")
    {
        let new_state = {...state};
        new_state.chats = [...action.chats];
        new_state.waiting = false;
        new_state.chatbox_users_ids = get_chatbox_users_ids(new_state.chats);
        new_state.chats_displayed = [action.my_id];
        return new_state;
    }
    if(action.type === "DELETE_CHATS")
    {
        let new_state = {...state};
        new_state.chats = [];
        new_state.chatbox_users_ids = [];
        new_state.chats_displayed = [];
        return new_state;
    }
    if(action.type === "NEW_CHAT")
    {
        let new_state = {...state};
        new_state.chats = [action.chat, ...state.chats];
        return new_state;
    }
    if(action.type === "CHAT_PARTICIPANTS_RECEIVED")
    {
        let new_state = {...state};
        new_state.waiting = false;
        new_state.chat_participants = [...action.chat_participants];
        new_state.chat_participants_ids = get_chat_participants_users_ids(new_state.chat_participants);
        return new_state;
    }
    if(action.type === "CHAT_PARTICIPANTS_DELETE")
    {
        let new_state = {...state};
        new_state.chat_participants = [];
        new_state.chat_participants_ids = [];
        return new_state;
    }
    return state;
}

export default chats_reducer;