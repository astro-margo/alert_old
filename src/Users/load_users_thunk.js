import {host} from "../host";

function load_users_thunk(params)
{
    return function(dispatch)
    {
        let form_data = new FormData();
        form_data.append("attach_type", params.attach_type);
        if(params.user_id)
            form_data.append("user_id", params.user_id);

        dispatch({type: "USERS_WAIT"});
        fetch(host + "/alert/php/load_users.php", {method: "POST", body: form_data, credentials: "include"})
            .then(data=>data.json())
            .then(data=>{
                dispatch({type: "SET_AUTH", auth: data.status, my_id: data.my_id});
                dispatch({type: "USERS_RECEIVED", users: data.users});
            });
    };
}

export default load_users_thunk;