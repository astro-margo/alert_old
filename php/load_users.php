<?php

require_once "access_allow_origin.php";
require_once "sql.php";
require_once "is_auth.php";
require_once "get_img_of_user.php";
require_once "get_attach_type.php";
require_once "delete_updates.php";


function get_users($pdo, $my_id, $user_id, $attach_type)
{
    if($attach_type === "none")
    {
        $users = sql_fetch_users($pdo);
        $dest_users = [];
        foreach($users as &$user)
        {
            if( get_attach_type($pdo, $my_id, $user["id"]) === "none" )
                $dest_users[] = $user;
        }
        $users = $dest_users;
    }
    else
    {
        $users_ids = get_attached_users_ids($pdo, $user_id, $attach_type);
        if(!$users_ids)
            return [];
        $users = sql_select_by_ids($pdo, "alert_users", "id", $users_ids);
    }

    foreach($users as &$user)
    {
        $attach_type = get_attach_type($pdo, $my_id, $user["id"]);
        $user["attach_type"] = $attach_type;
        $user["img"] = get_img_of_user($pdo, $user);
        unset($user["files"]);
        unset($user["e_mail"]);
        unset($user["password"]);
    }
    return $users;
}


$my_id = is_auth();

if($my_id)
{
    $pdo = sql_create_pdo();
    if(isset($_POST["user_id"]))
        $user_id = $_POST["user_id"];
    else
        $user_id = $my_id;

    $attach_type = $_POST["attach_type"];

    $users = get_users($pdo, $my_id, $user_id, $attach_type);

    if(($my_id == $user_id) && ($attach_type != "none"))
    {
        delete_updates($pdo, $my_id, $attach_type, "all");
    }

    $users = array_reverse($users);
    echo json_encode(["status" => "ok", "my_id" => $my_id, "users" => $users]);
}
else
{
    echo json_encode(["status" => "error"]);
}