<?php

function is_visiting($pdo, $my_id, $msg_type, $target_id)
{
    $visiting = json_decode((sql_select_by_id($pdo, "alert_updates", $my_id))["visiting"], true);
    if(isset($visiting[$msg_type]))
    {
        if($msg_type === "chats")
        {
            if(in_array($my_id, $visiting[$msg_type]))
                return true;
        }
        if(in_array($target_id, $visiting[$msg_type]))
            return true;
    }
    return false;
}

function set_updates($pdo, $my_id, $msg_type, $target_id, $quick_update=false)
{
    if(($msg_type === "comments") || ($msg_type === "followers") || ($msg_type === "friends") || ($msg_type === "news") || ($msg_type === "chats") || ($msg_type === "messages") || ($msg_type === "del_message"))
    {
        $is_visiting = is_visiting($pdo, $my_id, $msg_type, $target_id);
        if($is_visiting)
            $updates_json = (sql_select_by_id($pdo, "alert_updates", $my_id))["quick_updates"];
        else if($quick_update === false)
            $updates_json = (sql_select_by_id($pdo, "alert_updates", $my_id))["updates"];
        else
            return;
        $updates = json_decode($updates_json, true);
        if(isset($updates[$msg_type]))
            if(in_array($target_id, $updates[$msg_type]))
                return;
        $updates[$msg_type][] = $target_id;
        $updates_json = json_encode($updates);
        if($is_visiting)
            sql_update_by_id($pdo, "alert_updates", $my_id, ["quick_updates" => $updates_json]);
        else if($quick_update === false)
            sql_update_by_id($pdo, "alert_updates", $my_id, ["updates" => $updates_json]);
    }
}