<?php

function get_post_user_id($pdo, $post_id)
{
    $post_record = sql_select_by_id($pdo, "alert_posts", $post_id);
    if($post_record)
    {
        $user_id = $post_record["user_id"];
        return $user_id;
    }
    return 0;
}