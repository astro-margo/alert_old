<?php

require_once "../access_allow_origin.php";
require_once "../sql.php";
require_once "../is_auth.php";
require_once "../functions/get_user_name_by_id.php";

$my_id = is_auth();

if($my_id)
{
    $pdo = sql_create_pdo();

    $chat_name = get_user_name_by_id($pdo, $my_id);
    sql_insert($pdo, "alert_chats", ["null", $my_id, $chat_name, json_encode([$my_id]), time(), "[]"]);
    $chat_id = sql_last_id($pdo, "alert_chats");

    $my_chats_ids_record = sql_select_by_id($pdo, "alert_my_chats", $my_id);
    if($my_chats_ids_record)
    {
        $my_chats_ids_json = $my_chats_ids_record["chats"];
        $my_chats_ids = json_decode($my_chats_ids_json, true);
        $my_chats_ids[] = $chat_id;
        sql_update_by_id($pdo, "alert_my_chats", $my_id, ["chats" => json_encode($my_chats_ids)]);
    }
    else
        sql_insert($pdo, "alert_my_chats", [$my_id, json_encode([$chat_id])]);

    $chat = ["id" => $chat_id, "user_id" => $my_id, "chat_name" => $chat_name, "participants" => [], "inviters" => []];
    echo json_encode(["status" => "ok", "chat" => $chat]);
}
else
{
    echo json_encode(["status" => "error"]);
}