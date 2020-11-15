import {host} from "../../host";

function new_chat_thunk(dispatch)
{
    fetch(host + "/alert/php/chats/new_chat.php", {credentials: "include"})
        .then(data=>data.json())
        .then(data=>{
            if(data.status === "ok")
            {
                dispatch({type: "NEW_CHAT", chat: data.chat});
            }
        });
}

export default new_chat_thunk;