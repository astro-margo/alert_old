import {host} from "../../host";
import load_messages_thunk from "../NewMessage/load_messages_thunk";

function del_msg_thunk(params, id)
{
    return function(dispatch)
    {
        let form_data = new FormData();
        form_data.append("type", params.type);
        form_data.append("id", id);

        fetch(host + "/alert/php/del_msg.php", {method: "POST", body: form_data, credentials: "include"})
            .then(data=>data.json())
            .then(data=>{
                if(data.status === "ok")
                {
                    dispatch(load_messages_thunk(params, {}, "", {user_id: params.user_id}));
                }
            });
    }
}

export default del_msg_thunk;