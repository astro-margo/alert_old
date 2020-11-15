<?php

require_once "access_allow_origin.php";
require_once "sql.php";
require_once "is_auth.php";
require_once "accept_files.php";
require_once "del_files.php";
require_once "get_img_of_user.php";


$my_id = is_auth();

if($my_id)
{
    $pdo = sql_create_pdo();
    $user = sql_select_by_id($pdo, "alert_users", $my_id);

    if((count($_POST)>0) || (count($_FILES)>0))
    {
        if(isset($_POST["e_mail"]))
        {
            $users = sql_fetch_all($pdo, "alert_users");

            foreach($users as $user)
            {
                if($user["e_mail"] === $_POST["e_mail"] && $user["id"] !== "$my_id")
                {
                    echo json_encode(["status" => "exists"]);
                    exit();
                }
            }
            setcookie("e_mail", $_POST["e_mail"]);
        }

        if(isset($_POST["password"]))
        {
            setcookie("password", $_POST["password"]);
        }

        if(isset($_FILES["files"]))
        {
            if($user["files"] !== "[0]")
            {
                del_files($pdo, $user);
            }
            $_POST["files"] = (accept_files($pdo, $my_id, $_FILES["files"], "account_img"));
            $_POST["files"] = json_encode($_POST["files"]);
        }
        if(isset($_POST["del_img"]))
        {
            if($user["files"] !== "[0]")
            {
                del_files($pdo, $user);
            }
            unset($_POST["del_img"]);
            $_POST["files"] = "[0]";
        }
        sql_update_by_id($pdo, "alert_users", $my_id, $_POST);
    }

    $user = sql_select_by_id($pdo, "alert_users", $my_id);
    $img_id = $user["files"];

    $user["img"] = get_img_of_user($pdo, $user);
    echo json_encode(["status" => "ok", "data" => $user, "my_id" => $my_id]);
}
else
{
    echo json_encode(["status" => "error"]);
}