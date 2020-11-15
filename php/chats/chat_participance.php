<?php

require_once "../access_allow_origin.php";
require_once "../sql.php";
require_once "../is_auth.php";
require_once "../get_attach_type.php";
require_once "get_chat_participance.php";
require_once "set_chat_participance.php";
require_once "../set_updates.php";
require_once "../delete_updates.php";
require_once "get_chat_participants_ids.php";
require_once "../functions/get_user_name_by_id.php";

function quick_notify_participants($pdo, $my_id, $chat_id)
{
    $chat = sql_select_by_id($pdo, "alert_chats", $chat_id);
    $participants = json_decode($chat["participants"], true);
    foreach($participants as $participant)
        set_updates($pdo, $participant, "chats", $chat_id, true);
}

function update_chat_name($pdo, $chat_id)
{
    $chat = sql_select_by_id($pdo, "alert_chats", $chat_id);
    $participants_ids = json_decode($chat["participants"], true);
    $chat_name = "";
    foreach($participants_ids as $participant_id)
    {
        $user_name = get_user_name_by_id($pdo, $participant_id);
        $chat_name = $chat_name . $user_name . ", ";
    }
    $chat_name = rtrim($chat_name, ", ");
    sql_update_by_id($pdo, "alert_chats", $chat_id, ["chat_name" => $chat_name]);
}

$my_id = is_auth();

if($my_id)
{
    $pdo = sql_create_pdo();

    $participance = $_POST["participance"];
    $chat_id = $_POST["chat_id"];
    $participant_id = $_POST["participant_id"];

    $chat = sql_select_by_id($pdo, "alert_chats", $chat_id);
    if(!$chat)
    {
        echo json_encode(["status" => "chat_not_found"]);
        exit();
    }

    if($participance === "inviters")
    {
        if($my_id != $chat["user_id"])
        {
            echo json_encode(["status" => "not_your_chat"]);
            exit();
        }
        if(get_chat_participance($pdo, $my_id, $chat_id, $participant_id) === "none")
        {
            set_chat_participance($pdo, $chat_id, $participant_id, $participance);
            set_updates($pdo, $participant_id, "chats", $chat_id);
        }
    }

    if($participance === "delete_inviter")
    {
        if(get_chat_participance($pdo, $my_id, $chat_id, $participant_id) === "inviters")
        {
            set_chat_participance($pdo, $chat_id, $participant_id, $participance);
            delete_updates($pdo, $participant_id, "chats", $chat_id);
            set_updates($pdo, $participant_id, "chats", $chat_id, true);
        }
    }

    if($participance === "delete_participant")
    {
        if(get_chat_participance($pdo, $my_id, $chat_id, $participant_id) === "participants")
        {
            quick_notify_participants($pdo, $my_id, $chat_id);
            set_chat_participance($pdo, $chat_id, $participant_id, $participance);
            update_chat_name($pdo, $chat_id);
        }
    }

    if($participance === "participants")
    {
        if(get_chat_participance($pdo, $my_id, $chat_id, $participant_id) === "inviters")
        {
            set_chat_participance($pdo, $chat_id, $participant_id, "delete_inviter");
            set_chat_participance($pdo, $chat_id, $participant_id, $participance);
            quick_notify_participants($pdo, $my_id, $chat_id);
            update_chat_name($pdo, $chat_id);
        }
    }

    echo json_encode(["status" => "ok"]);
}
else
{
    echo json_encode(["status" => "error"]);
}