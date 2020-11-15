import {host} from "../host";

function auth_thunk(type, user_data)
{
    return function(dispatch)
    {
        dispatch({type: "AUTH_WAIT"});
        let form_data = new FormData();

        if(type === "new_account")
        {
            form_data.append("name", user_data.name);
            form_data.append("surname", user_data.surname);
        }

        form_data.append("e_mail", user_data.e_mail);
        form_data.append("password", user_data.password);
        form_data.append("type", type);
        fetch(host + "/alert/php/auth.php", {method: "POST", body: form_data, credentials: "include"})
            .then(data=>data.json())
            .then(data=>
            {
                dispatch({type: "AUTH_DATA_RECEIVED", status: data.status, id: data.id});
            });
    };
}

export default auth_thunk;