<?php

function get_attached_users_ids($pdo, $my_id, $attach_type)
{
    $my_attaches = [];
    $my_attaches_record = sql_select_by_id($pdo, "alert_" . $attach_type, $my_id);
    if($my_attaches_record)
    {
        $my_attaches_json = $my_attaches_record[$attach_type];
        $my_attaches = json_decode($my_attaches_json, true);
        return $my_attaches;
    }
    return false;
}

function get_attach_type($pdo, $my_id, $user_id)
{
    $attach_type = "none";

    $my_follows = get_attached_users_ids($pdo, $my_id, "follows");
    if($my_follows)
        if(in_array($user_id, $my_follows)) $attach_type = "follows";
    $my_followers = get_attached_users_ids($pdo, $my_id, "followers");
    if($my_followers)
        if(in_array($user_id, $my_followers)) $attach_type = "followers";
    $my_friends = get_attached_users_ids($pdo, $my_id, "friends");
    if($my_friends)
        if(in_array($user_id, $my_friends)) $attach_type = "friends";

    if($user_id === $my_id) $attach_type = "";

    return $attach_type;
}