import {host} from "../host";

function load_private_data_thunk(user_id)
{
    return function(dispatch)
    {
        dispatch({type: "PRIVATE_WAIT"});
        fetch(host + `/alert/php/private.php?user_id=${user_id}`, {credentials: "include"})
            .then(data=>data.json())
            .then(data=>
            {
                dispatch({type: "SET_AUTH", auth: data.status, my_id: data.my_id});
                dispatch({type: "PRIVATE_DATA_RECEIVED", status: data.status, data: data.data, found: data.found, id: user_id});
            });
    }
}

export default load_private_data_thunk;