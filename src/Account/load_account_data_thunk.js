import {host}from "../host";

function load_account_data_thunk(input="")
{
    return function(dispatch)
    {
        dispatch({type: "ACCOUNT_WAIT"});


        let form_data = new FormData();

        if(input.img)
        {
            if(input.img === "del") form_data.append("del_img", "del_img");
            else form_data.append("files[]", input.img, input.img.name);
        }
        if(input.name) form_data.append("name", input.name);
        if(input.surname) form_data.append("surname", input.surname);
        if(input.e_mail) form_data.append("e_mail", input.e_mail);
        if(input.password) form_data.append("password", input.password);

        dispatch({type: "ACCOUNT_WAIT"});
        fetch(host + "/alert/php/account.php", {method: "POST", body: form_data, credentials: "include"})
            .then(data=>data.json())
            .then(data=>
            {
                dispatch({type: "SET_AUTH", auth: data.status, my_id: data.my_id});
                dispatch({type: "ACCOUNT_DATA_RECEIVED", status: data.status, data: data.data});
            });
    }
}

export default load_account_data_thunk;