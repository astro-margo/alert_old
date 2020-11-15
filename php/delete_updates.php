<?php

require_once "array_to_list.php";

function delete_updates($pdo, $user_id, $update_type, $target_id)
{
    $updates_record = sql_select_by_id($pdo, "alert_updates", $user_id);
    if(!$updates_record) return 0;
    $updates_json = $updates_record["updates"];
    $updates = json_decode($updates_json, true);
    if(!isset($updates[$update_type])) return 0;
    if($target_id === "all")
        unset($updates[$update_type]);
    else
    {
        if(($key = array_search($target_id, $updates[$update_type])) === false) return 0;
        unset($updates[$update_type][$key]);
        $updates[$update_type] = array_to_list($updates[$update_type]);
        if(count($updates[$update_type]) === 0)
            unset($updates[$update_type]);
    }
    $updates_json = json_encode($updates);
    return sql_update_by_id($pdo, "alert_updates", $user_id, ["updates" => $updates_json]);
}

function delete_quick_updates($pdo, $user_id)
{
    $updates_record = sql_select_by_id($pdo, "alert_updates", $user_id);
    if(!$updates_record) return 0;
    return sql_update_by_id($pdo, "alert_updates", $user_id, ["quick_updates" => "[]"]);
}