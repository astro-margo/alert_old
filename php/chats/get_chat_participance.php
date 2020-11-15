<?php

function get_chat_participance($pdo, $my_id, $chat_id, $participant_id)
{
    $chat = sql_select_by_id($pdo, "alert_chats", $chat_id);
    if(!$chat) return false;
    $participants = json_decode($chat["participants"], true);
    $inviters = json_decode($chat["inviters"], true);
    if(in_array($participant_id, $participants))
        return "participants";
    if(in_array($participant_id, $inviters))
        return "inviters";
    if($my_id)
    {
        $friends_ids = get_attached_users_ids($pdo, $my_id, "friends");
        if(in_array($participant_id, $friends_ids))
            return "none";
    }
    return false;
}