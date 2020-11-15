<?php

function msg_is_deletable($pdo, $message, $msg_type, $my_id)
{
    if($message["user_id"] === "$my_id")
    {
        return true;
    }
    else if($msg_type === "comments")
    {
        $post_id = $message["post_id"];
        $post = sql_select_by_id($pdo, "alert_posts", $post_id);
        $user_id = $post["user_id"];
        if($user_id === "$my_id")
            return true;
    } 
    else return false;
}