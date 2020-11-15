import {host} from "../host";
import load_users_thunk from "./load_users_thunk";

function attach_thunk(attach_type, user_id, params="")
{
    return function(dispatch)
    {
        let form_data = new FormData();
        if(attach_type === "follows") attach_type="unfollow";
        if(attach_type === "friends") attach_type="delete_friend";
        if(attach_type === "followers") attach_type="friends";
        if(attach_type === "none") attach_type="follows";

        form_data.append("attach_type", attach_type);
        form_data.append("user_id", user_id);

        dispatch({type: "USERS_WAIT"}); 
        fetch(host + "/alert/php/attach.php", {method: "POST", body: form_data, credentials: "include"})
            .then(data=>data.json())
            .then(data=>{
                if(params)
                    dispatch(load_users_thunk(params));
                else
                    dispatch({type: "PRIVATE_ATTACH_TYPE", attach_type: data.attach_type});
            });
    };
}

export default attach_thunk;