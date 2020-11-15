<?php

function get_target_id_of_msg($pdo, $msg_type, $msg_id)
{
    $msg = sql_select_by_id($pdo, "alert_" . $msg_type, $msg_id);
    if(!$msg)
        return false;
    if($msg_type === "comments")
    {
        if(isset($msg["post_id"]))
            return $msg["post_id"];
    }
    if($msg_type === "messages")
    {
        if(isset($msg["chat_id"]))
            return $msg["chat_id"];
    }
    if($msg_type === "posts")
    {
        if(isset($msg["user_id"]))
            return $msg["user_id"];
    }
    return false;
}