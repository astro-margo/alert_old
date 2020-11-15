const default_state = {
    comments: [],
    user_id_to_online: [],
    followers: [],
    friends: [],
    news: [],
    chats: [],
    messages: []
};

function app_reducer(state = default_state, action)
{
    if(action.type === "UPDATES_FOR_MENU")
    {
        let new_state = {...state};
        new_state.comments = [];
        new_state.followers = [];
        new_state.follows = [];
        new_state.friends = [];
        new_state.news = [];
        new_state.chats = [];
        new_state.messages = [];

        for(let key in action.updates_for_menu)
            new_state[key] = action.updates_for_menu[key];

        return new_state;
    }
    if(action.type === "USER_ID_TO_ONLINE")
    {
        let new_state = {...state};
        new_state.user_id_to_online = action.user_id_to_online;
        return new_state;
    }
    return state;
}

export default app_reducer;