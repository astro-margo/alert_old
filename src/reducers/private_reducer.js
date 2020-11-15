const default_state = {
    name: "",
    surname: "",
    img: "",
    waiting: false,
    found: "",
    cur_user_id: "",
    attach_type: "",

    is_show_contacts_wnd: false,
    contacts_wnd_attach_type: "",
};

function private_reducer(state = default_state, action)
{
    if(action.type === "PRIVATE_WAIT")
    {
        let new_state = {...state};
        new_state.waiting = true;
        return new_state;
    }
    if(action.type === "PRIVATE_DATA_RECEIVED")
    {
        let new_state = {...state};
        new_state.waiting = false;
        if(action.status === "ok")
        {
            new_state.cur_user_id = action.id;
            if( (new_state.found=action.found) === "found")
            {
                new_state.name = action.data.name;
                new_state.surname = action.data.surname;
                new_state.img = action.data.img;
                new_state.attach_type = action.data.attach_type;
            }
        }
        return new_state;
    }
    if(action.type === "SHOW_CONTACTS_WND")
    {
        let new_state = {...state};
        new_state.is_show_contacts_wnd = action.show;
        new_state.contacts_wnd_attach_type = action.attach_type;
        return new_state;
    }
    if(action.type === "PRIVATE_ATTACH_TYPE")
    {
        let new_state = {...state};
        new_state.attach_type = action.attach_type;
        return new_state;
    }
    if(action.type === "PRIVATE_UNMOUNT")
    {
        let new_state = {...state};
        new_state.name = "";
        new_state.surname = "";
        new_state.img = "";
        new_state.found = "";
        new_state.cur_user_id = "";
        new_state.attach_type = "";
        return new_state;
    }
    return state;
}

export default private_reducer;