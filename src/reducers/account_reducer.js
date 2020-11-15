const default_state = {
    img: "",
    name: "",
    surname: "",
    e_mail: "",
    password: "",
    waiting: false
};

function account_reducer(state = default_state, action)
{
    if(action.type === "ACCOUNT_WAIT")
    {
        let new_state = {...state};
        new_state.waiting = true;
        return new_state;
    }
    if(action.type === "ACCOUNT_DATA_RECEIVED")
    {
        let new_state = {...state};
        new_state.waiting = false;
        if(action.status === "ok")
        {
            new_state.img = action.data.img;
            new_state.name = action.data.name;
            new_state.surname = action.data.surname;
            new_state.e_mail = action.data.e_mail;
            new_state.password = action.data.password;
        }
        return new_state;
    }
    return state;
}

export default account_reducer;