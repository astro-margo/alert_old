<?php

require_once "sql.php";
require_once "is_auth.php";
require_once "access_allow_origin.php";

$my_id = is_auth();

if($my_id)
{
    if(isset($_COOKIE["e_mail"]) && isset($_COOKIE["password"]))
    {
        setcookie("e_mail");
        setcookie("password");

        $pdo = sql_create_pdo();
        sql_update_by_id($pdo, "alert_updates", $my_id, ["online" => "offline"]);
    }
    echo "by";
}