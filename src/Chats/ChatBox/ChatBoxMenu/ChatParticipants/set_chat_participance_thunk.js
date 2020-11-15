import {host} from "../../../../host";
import load_chat_participants_thunk from "./load_chat_participants_thunk";
import load_chats_thunk from "../../../load_chats_thunk";

function set_chat_participance_thunk(chat_id, participant_id, participance, initiated_from)
{
    return function(dispatch)
    {
        let form_data = new FormData();
        form_data.append("chat_id", chat_id);
        form_data.append("participant_id", participant_id);
        form_data.append("participance", participance);

        dispatch({type: "CHATS_WAIT"});
        fetch(host + "/alert/php/chats/chat_participance.php", {method: "POST", body: form_data, credentials: "include"})
            .then(data=>data.json())
            .then(data=>{
                if(data.status === "ok")
                {
                    if(initiated_from.type === "participants")
                        dispatch(load_chat_participants_thunk(chat_id, initiated_from.participance));
                    if(initiated_from.type === "chatbox")
                        dispatch(load_chats_thunk);
                }
            });
    };
}

export default set_chat_participance_thunk;