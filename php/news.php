<?php

require_once "get_attach_type.php";

function get_news($pdo, $my_id)
{
    $my_friends_ids = get_attached_users_ids($pdo, $my_id, "friends");
    if(!$my_friends_ids)
        return [];
    $posts = sql_select_by_ids($pdo, "alert_posts", "user_id", $my_friends_ids);
    return array_reverse($posts);
}

function set_news_updates($pdo, $my_id)
{
    $my_friends_ids = get_attached_users_ids($pdo, $my_id, "friends");
    if(!$my_friends_ids) return;
    foreach($my_friends_ids as $friend_id)
    {
        set_updates($pdo, $friend_id, "news", $my_id);
    }
}