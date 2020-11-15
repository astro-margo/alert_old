<?php

require_once "../array_to_list.php";

function set_chat_participance($pdo, $chat_id, $participant_id, $participance)
{
    $chat = sql_select_by_id($pdo, "alert_chats", $chat_id);
    if($participance === "inviters" || $participance === "participants")
    {
        $chat_participants_ids = json_decode($chat[$participance], true);
        if(in_array($participant_id, $chat_participants_ids))
            return;
        $chat_participants_ids[] = $participant_id;

        sql_update_by_id($pdo, "alert_chats", $chat_id, [$participance => json_encode($chat_participants_ids)]);

        if($participance === "inviters" || $participance === "participants")
        {
            $participant_chats_record = sql_select_by_id($pdo, "alert_my_chats", $participant_id);
            if($participant_chats_record)
            {
                $participant_chats = json_decode($participant_chats_record["chats"], true);
                if(in_array($chat_id, $participant_chats))
                    return;
                $participant_chats[] = $chat_id;
                sql_update_by_id($pdo, "alert_my_chats", $participant_id, ["chats" => json_encode($participant_chats)]);
            }
            else
            {
                $participant_chats = [];
                $participant_chats[] = $chat_id;
                sql_insert($pdo, "alert_my_chats", [$participant_id, json_encode($participant_chats)]);
            }
        }
    }
    if($participance === "delete_inviter" || $participance === "delete_participant")
    {
        $participance = ltrim($participance, "delete_") . 's';
        $chat_participants_ids = json_decode($chat[$participance], true);
        $chat_participants_ids = array_diff($chat_participants_ids, [$participant_id]);
        $chat_participants_ids = array_to_list($chat_participants_ids);
        sql_update_by_id($pdo, "alert_chats", $chat_id, [$participance => json_encode($chat_participants_ids)]);

        $participant_chats_record = sql_select_by_id($pdo, "alert_my_chats", $participant_id);
        if($participant_chats_record)
        {
            $participant_chats = json_decode($participant_chats_record["chats"], true);
            $participant_chats = array_diff($participant_chats, [$chat_id]);
            sql_update_by_id($pdo, "alert_my_chats", $participant_id, ["chats" => json_encode($participant_chats)]);
        }
    }
}







