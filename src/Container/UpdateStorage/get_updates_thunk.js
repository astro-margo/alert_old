import {host} from "../../host";
import load_messages_thunk from "../../Dialog/NewMessage/load_messages_thunk";
import load_chats_thunk from "../../Chats/load_chats_thunk";

function get_updates_thunk(online, display, users_ids)
{
    return function(dispatch)
    {
        let form_data = new FormData();
        form_data.append("online", online);
        form_data.append("users_ids", JSON.stringify(users_ids));
console.log("display_send: ", display);
        if(display)
            form_data.append("f_display", JSON.stringify(display));

        fetch(host + "/alert/php/get_updates.php", {method: "POST", body: form_data, credentials: "include"})
            .then(data=>data.json())
            .then(data=>{
console.log("update_data: ", data);
                if(data.status === "ok")
                {
                    dispatch({type: "USER_ID_TO_ONLINE", user_id_to_online: data.user_id_to_online});

                    let updates_for_menu = {};
/*
                    for(let key in data.updates)
                    {
                        if(key === "messages")
                        {
                            updates_for_menu.messages = [];
                            for(let chat_id of data.updates.messages)
                            {
                                if(display.messages === chat_id)
                                {
                                    dispatch(load_messages_thunk({type: "messages", chat_id: chat_id}));
                                    delete data.updates["del_message"];
                                }
                                else
                                    updates_for_menu.messages.push(chat_id);
                            }
                        }
                        else if(key === "new_chats")
                        {
                            if(display.chats)
                                dispatch(load_chats_thunk);
                            else
                                updates_for_menu.new_chats = data.updates.new_chats;
                        }
                        else
                            updates_for_menu[key] = data.updates[key];
                    }
*/
                    updates_for_menu = data.updates;
                    for(let section in data.quick_updates)
                    {
                        for(let target_id of data.quick_updates[section])
                        {
                            if(section === "chats")
                                dispatch(load_chats_thunk);
                            if(section === "messages")
                                dispatch(load_messages_thunk({type: "messages", chat_id: target_id}));
                            if(section === "comments")
                                dispatch(load_messages_thunk({type: "comments", post_id: target_id}));
                        }
                    }
                    dispatch({type: "UPDATES_FOR_MENU", updates_for_menu: updates_for_menu});
                }
            });
    }
}

export default get_updates_thunk;