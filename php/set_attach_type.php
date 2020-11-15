<?php

require_once "array_to_list.php";

function set_attach_type($pdo, $my_id, $user_id, $attach_type)
{
    if(($attach_type === "follows") || ($attach_type === "followers") || ($attach_type === "friends"))
    {
        $attached_users = get_attached_users_ids($pdo, $my_id, $attach_type);
        if($attached_users === false)
        {
            $attached_users = [$user_id];
            $attached_users_json = json_encode($attached_users);
            sql_insert($pdo, "alert_" . $attach_type, [$my_id, $attached_users_json]);
        }
        else
        {
            $attached_users[] = $user_id;
            $attached_users_json = json_encode($attached_users);
            sql_update_by_id($pdo, "alert_" . $attach_type, $my_id, [$attach_type => $attached_users_json]);
        }
    }

    if(($attach_type === "unfollow") || ($attach_type === "unfollower") || ($attach_type === "delete_friend"))
    {
        if($attach_type === "unfollow") $attach_type = "follows";
        if($attach_type === "unfollower") $attach_type = "followers";
        if($attach_type === "delete_friend") $attach_type = "friends";

        $attached_users = get_attached_users_ids($pdo, $my_id, $attach_type);
        if($attached_users)
        {
            $key = array_search($user_id, $attached_users);
            if($key === false) return;
            unset($attached_users[$key]);
            $attached_users = array_to_list($attached_users);
            $attached_users_json = json_encode($attached_users);
            sql_update_by_id($pdo, "alert_" . $attach_type, $my_id, [$attach_type => $attached_users_json]);
        }
    }
}