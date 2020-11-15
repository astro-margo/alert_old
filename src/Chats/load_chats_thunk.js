import {host} from "../host";

function load_chats_thunk(dispatch)
{
    dispatch({type: "CHATS_WAIT"});
    fetch(host + "/alert/php/chats/load_chats.php", {credentials: "include"})
        .then(data=>data.json())
        .then(data=>{
console.log("load_chats: ", data);
            dispatch({type: "SET_AUTH", auth: data.status, my_id: data.my_id});
            if(data.status === "ok")
                dispatch({type: "CHATS_RECEIVED", chats: data.chats, my_id: data.my_id});
        });
}

export default load_chats_thunk;