import {host} from "../../../host";
import load_chats_thunk from "../../load_chats_thunk";

function delete_chat_thunk(chat_id)
{
    return function(dispatch)
    {
        let form_data = new FormData();
        form_data.append("chat_id", chat_id);

        fetch(host + "/alert/php/chats/delete_chat.php", {method: "POST", body: form_data, credentials: "include"})
            .then(data=>data.json())
            .then(data=>{
                dispatch(load_chats_thunk);
            });
    };
}

export default delete_chat_thunk;