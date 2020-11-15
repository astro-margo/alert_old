<?php

require_once "../access_allow_origin.php";
require_once "../sql.php";
require_once "../is_auth.php";
require_once "../get_img_of_user.php";
require_once "../get_attach_type.php";
require_once "../functions/user_safe_config.php";

function get_chat_participants($pdo, $my_id, $chat_id, $participance)
{
    $participants = [];
    $chat = sql_select_by_id($pdo, "alert_chats", $chat_id);
    if($participance === "none")
    {
        $my_friends_ids = get_attached_users_ids($pdo, $my_id, "friends");
        if(!$my_friends_ids) $my_friends_ids=[];
        $participants_ids = json_decode($chat["participants"], true);
        $inviters_ids = json_decode($chat["inviters"], true);
        $participants_ids = array_diff($my_friends_ids, $participants_ids, $inviters_ids);
    }
    if($participance === "participants")
    {
        $participants_ids = json_decode($chat["participants"], true);
        $participants_ids = array_diff($participants_ids, [$my_id]);
    }
    if($participance === "inviters")
    {
        $participants_ids = json_decode($chat["inviters"], true);
    }
    $participants = sql_select_by_ids($pdo, "alert_users", "id", $participants_ids);
    foreach($participants as &$participant)
    {
        $participant = user_safe_config($pdo, $participant);
    }
    return $participants;
}

$my_id = is_auth();

if($my_id)
{
    $pdo = sql_create_pdo();

    $chat_id = $_POST["chat_id"];
    $participance = $_POST["participance"];

    $chat = sql_select_by_id($pdo, "alert_chats", $chat_id);
    if(!$chat)
    {
        echo json_encode(["status" => "chat_not_found"]);
        exit();
    }
    if($my_id != $chat["user_id"] && ($participance === "none" || $participance === "inviters"))
    {
        echo json_encode(["status" => "not_your_chat"]);
        exit();
    }

    $participants = get_chat_participants($pdo, $my_id, $chat_id, $participance);

    echo json_encode(["status" => "ok", "chat_participants" => $participants, "my_id" => $my_id]);
}
else
{
    echo json_encode(["status" => "error"]);
}