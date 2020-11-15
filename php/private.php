<?php

require_once "sql.php";
require_once "is_auth.php";
require_once "get_img_of_user.php";
require_once "access_allow_origin.php";
require_once "get_attach_type.php";

$my_id = is_auth();

if($my_id)
{
    $user_id = $_GET["user_id"];
    $pdo = sql_create_pdo();
    $user = sql_select_by_id($pdo, "alert_users", $user_id);
    if(!$user)
    {
        echo json_encode(["status" => "ok", "found" => "not_found", "my_id" => $my_id]);
        exit();
    }
    $user["img"]= get_img_of_user($pdo, $user);
    $user["attach_type"] = get_attach_type($pdo, $my_id, $user["id"]);
    unset($user["password"]);
    unset($user["e_mail"]);
    unset($user["files"]);
    echo json_encode(["status" => "ok", "data" => $user, "my_id" => $my_id, "found" => "found"]);
}
else
{
    echo json_encode(["status" => "error"]);
}