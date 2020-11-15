import {host} from "../host";

function delete_account_thunk(dispatch)
{
    dispatch({type: "ACCOUNT_WAIT"});
    fetch(host + "/alert/php/delete_account.php")
        .then(data=>data.text())
        .then(data=>{
console.log(data);
        });
}

export default delete_account_thunk;