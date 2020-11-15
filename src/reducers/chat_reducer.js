const default_state = {
    posts: [],
    comments: {},
    chat: [],
    news: [],
    messages: [],

    comments_displayed: [],
    chat_displayed: [],
    users_ids: []
};

function get_comments_keys(comments)
{
    let keys = [];
    for(let k in comments)
        keys.push(k);
    return keys;
}

function add_user_ids_from_messages(users_ids, messages)
{
    for(let message of messages)
    {
        if(users_ids.indexOf(message.user_id) === -1)
            users_ids.push(message.user_id);
    }
}

function get_users_ids_from_messages(new_state)
{
    let users_ids = [];
    add_user_ids_from_messages(users_ids, new_state.posts);
    add_user_ids_from_messages(users_ids, new_state.news);
    add_user_ids_from_messages(users_ids, new_state.messages);
    for(let key in new_state.comments)
    {
        let comments = new_state.comments[key];
        add_user_ids_from_messages(users_ids, comments);
    }
    return users_ids;
}

function chat_reducer(state = default_state, action)
{
    if(action.type === "LOAD_MESSAGES")
    {
        let new_state = {...state};
        if((action.params.type === "posts") || (action.params.type === "news") || (action.params.type === "messages"))
        {
            new_state[action.params.type] = [...action.messages];
        }
        if(action.params.type === "comments")
        {
            new_state.comments[action.params.post_id] = [...action.messages];
        }
        new_state.comments_displayed = get_comments_keys(new_state.comments);
        new_state.chat_displayed = action.params.chat_id ? [action.params.chat_id] : [];

        new_state.users_ids = get_users_ids_from_messages(new_state);
        return new_state;
    }
    if(action.type === "REMOVE_DIALOG")
    {
        let new_state = {...state};
        if(action.param_type === "comments")
        {
            delete(new_state.comments[action.post_id]);
            new_state.comments_displayed = get_comments_keys(new_state.comments);
        }
        else
            new_state[action.param_type] = [];

        new_state.chat_displayed = [];
        new_state.users_ids = get_users_ids_from_messages(new_state);
        return new_state;
    }
    return state;
}

export default chat_reducer;