<?php

function get_chat_participants_ids($pdo, $my_id, $chat_id)
{
    $chat = sql_select_by_id($pdo, "alert_chats", $chat_id);
    if(!$chat)
        return [];
    $participants_ids = json_decode($chat["participants"], true);
    $key = array_search($my_id, $participants_ids);
    if($key === false)
        return [];        //not_your_chat
    unset($participants_ids[$key]);
    return $participants_ids;
}