<?php

require_once "sql.php";
require_once "is_auth.php";
require_once "del_files.php";
require_once "access_allow_origin.php";

$my_id = is_auth();

if($my_id)
{
    $pdo = sql_create_pdo();

    

    echo json_encode(["status" => "ok", "data" => $user, "my_id" => $my_id]);
}
else
{
    echo json_encode(["status" => "error"]);
}