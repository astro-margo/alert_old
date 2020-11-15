<?php

function get_user_name_by_id($pdo, $user_id)
{
    $user_record = sql_select_by_id($pdo, "alert_users", $user_id);
    if(!$user_record)
        return "";
    $user_name = $user_record["name"] . " " . $user_record["surname"];
    return $user_name;
}