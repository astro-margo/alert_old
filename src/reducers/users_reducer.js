const default_state = {
    users: [],
    waiting: false,
    users_ids: []
};

function get_users_ids(users)
{
    let users_ids = [];
    for(let user of users)
    {
        users_ids.push(user.id);
    }
    return users_ids;
}

function users_reducer(state = default_state, action)
{
    if(action.type === "USERS_WAIT")
    {
        let new_state = {...state};
        new_state.waiting = true;
        return new_state;
    }
    if(action.type === "USERS_RECEIVED")
    {
        let new_state = {...state};
        new_state.waiting = false;
        new_state.users = [...action.users];
        new_state.users_ids = get_users_ids(new_state.users);
        return new_state;
    }
    if(action.type === "DELETE_USERS")
    {
        let new_state = {...state};
        new_state.users = [];
        new_state.users_ids = [];
        return new_state;
    }
    return state;
}

export default users_reducer;