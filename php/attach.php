<?php

require_once "access_allow_origin.php";
require_once "sql.php";
require_once "is_auth.php";
require_once "get_attach_type.php";
require_once "set_attach_type.php";
require_once "set_updates.php";
require_once "delete_updates.php";

$my_id = is_auth();

if($my_id)
{
    $pdo = sql_create_pdo();
    $attach_type = $_POST["attach_type"];
    $user_id = $_POST["user_id"];

    if($attach_type === "follows")
    {
        if(get_attach_type($pdo, $my_id, $user_id) === "none")
        {
            set_attach_type($pdo, $my_id, $user_id, "follows");
            set_attach_type($pdo, $user_id, $my_id, "followers");
            set_updates($pdo, $user_id, "followers", $my_id);
        }
    }

    if($attach_type === "friends")
    {
        if(get_attach_type($pdo, $my_id, $user_id) === "followers")
        {
            set_attach_type($pdo, $my_id, $user_id, "unfollower");
            set_attach_type($pdo, $user_id, $my_id, "unfollow");

            set_attach_type($pdo, $my_id, $user_id, "friends");
            set_attach_type($pdo, $user_id, $my_id, "friends");
            set_updates($pdo, $user_id, "friends", $my_id);
        }
    }

    if($attach_type === "unfollow")
    {
        if(get_attach_type($pdo, $my_id, $user_id) === "follows")
        {
            set_attach_type($pdo, $my_id, $user_id, "unfollow");
            set_attach_type($pdo, $user_id, $my_id, "unfollower");
            delete_updates($pdo, $user_id, "followers", $my_id);
            $attach_type = "none";
        }
    }

    if($attach_type === "delete_friend")
    {
        if(get_attach_type($pdo, $my_id, $user_id) === "friends")
        {
            set_attach_type($pdo, $my_id, $user_id, "delete_friend");
            set_attach_type($pdo, $user_id, $my_id, "delete_friend");
            delete_updates($pdo, $user_id, "friends", $my_id);
            $attach_type = "none";
        }
    }

    echo json_encode(["status" => "ok", "attach_type" => $attach_type]);
}
else
{
    echo json_encode(["status" => "error"]);
}