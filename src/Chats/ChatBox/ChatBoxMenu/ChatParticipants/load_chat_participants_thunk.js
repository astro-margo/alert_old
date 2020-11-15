import {host} from "../../../../host";

function load_chat_participants_thunk(chat_id, participance)
{
    return function(dispatch)
    {
        let form_data = new FormData();
        form_data.append("chat_id", chat_id);
        form_data.append("participance", participance);

        dispatch({type: "CHATS_WAIT"});
        fetch(host + "/alert/php/chats/load_chat_participants.php", {method: "POST", body: form_data, credentials: "include"})
            .then(data=>data.json())
            .then(data=>{
console.log("load_chat_participants: ", data);
                if(data.status === "ok")
                {
                    dispatch({type: "CHAT_PARTICIPANTS_RECEIVED", chat_participants: data.chat_participants});
                }
            });
    }
}

export default load_chat_participants_thunk;