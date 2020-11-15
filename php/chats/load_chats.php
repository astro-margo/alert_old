<?php

require_once "../access_allow_origin.php";
require_once "../sql.php";
require_once "../is_auth.php";
require_once "../get_img_of_user.php";
require_once "../array_to_list.php";
require_once "../delete_updates.php";

$my_id = is_auth();

if($my_id)
{
    $pdo = sql_create_pdo();

    $my_chats_ids_record = sql_select_by_id($pdo, "alert_my_chats", $my_id);
    if($my_chats_ids_record)
    {
        $my_chats_ids_json = $my_chats_ids_record["chats"];
        $my_chats_ids = json_decode($my_chats_ids_json, true);
        $my_chats = sql_fetch_chats($pdo, $my_chats_ids);
    }
    else
        $my_chats=[];

    foreach($my_chats as &$my_chat)
    {
        $participants_ids_json = $my_chat["participants"];
        $participants_ids = json_decode($participants_ids_json, true);
        $participants_ids = array_diff($participants_ids, [$my_id]);
        $participants_ids = array_to_list($participants_ids);
        $my_chat["inviters"] = json_decode($my_chat["inviters"], true);

        if(count($participants_ids) === 1)
        {
            $participant = sql_select_by_id($pdo, "alert_users", $participants_ids[0]);
            if($participant)
            {
                $my_chat["participant"] = ["id" => $participant["id"], "name" => $participant["name"], "surname" => $participant["surname"], "img" => get_img_of_user($pdo, $participant)];
            }
        }
    }
    delete_updates($pdo, $my_id, "chats", "all");

    echo json_encode(["status" => "ok", "chats" => $my_chats, "my_id" => $my_id]);
}
else
{
    echo json_encode(["status" => "error"]);
}