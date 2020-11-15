import {host} from "../../host";

function load_messages_thunk(params, input={}, msg_for_recall="", query_params={})
{
    return function(dispatch)
    {
        let fetch_obj = {};
        let form_data = new FormData();
        form_data.append("type", params.type);
        if(input.text)
        {
            form_data.append("text", input.text);
        }
        if(input.files)
        {
            input.files.forEach(file => {
                form_data.append("files[]", file, file.name);
            });
        }
        if(msg_for_recall)
        {
            form_data.append("recall", JSON.stringify(msg_for_recall));
        }
        if(params.type === "comments")
            form_data.append("post_id", params.post_id);
        if(params.type === "messages")
            form_data.append("chat_id", params.chat_id);

        fetch_obj = {method: "POST", body: form_data, credentials: "include"};

        let query_string="";
        if(query_params.user_id)
        {
            query_string=`?user_id=${query_params.user_id}`;
        }

        fetch(host + `/alert/php/load_messages.php${query_string}`, fetch_obj)
            .then(data=>data.json())
            .then(data=>{
                if(data.status === "ok")
                {
                    dispatch({type: "SET_AUTH", auth: data.status, my_id: data.my_id});
                    dispatch({type: "LOAD_MESSAGES", messages: data.data, params});
                }
                else
                    dispatch({type: "SET_AUTH", auth: data.status});
            });

    }
}

export default load_messages_thunk;