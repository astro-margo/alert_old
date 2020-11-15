<?php

require_once "sql.php";
require_once "is_auth.php";
require_once "access_allow_origin.php";
require_once "functions/print_r_txt.php";
require_once "delete_updates.php";
require_once "array_to_list.php";

$online = $_POST["online"];
$users_ids_json = $_POST["users_ids"];
$users_ids = json_decode($users_ids_json, true);
if(isset($_POST["f_display"]))
{
    $display_json = $_POST["f_display"];
}
else
    $display_json = "[]";

function set_visitors($pdo, $my_id, $action, $display)
{
    foreach($display as $section=>$ids)
    {
        foreach($ids as $id)
        {
            $visitors_record = sql_select_by_id($pdo, "alert_{$section}_visitors", $id);
            if($visitors_record)
            {
                $visitors = json_decode($visitors_record["visitors"], true);
                $key = array_search($my_id, $visitors);
                if($key === false && $action === "add")
                {
                    $visitors[] = $my_id;
                    sql_update_by_id($pdo, "alert_{$section}_visitors", $id, ["visitors" => json_encode($visitors)]);
                }
                if($key !== false && $action === "delete")
                {
                    unset($visitors[$key]);
                    $visitors = array_to_list($visitors);
                    sql_update_by_id($pdo, "alert_{$section}_visitors", $id, ["visitors" => json_encode($visitors)]);
                }
            }
            else
            {
                if($action === "add")
                {
                    $visitors = [$my_id];
                    sql_insert($pdo, "alert_{$section}_visitors", [$id, json_encode($visitors)]);
                }
            }
        }
    }
}

function update_visitors($pdo, $my_id, $display_json)
{
    $display = json_decode($display_json, true);
//print_r_txt("debug.txt", $display);
    if(is_array($display))
    {
        $visiting = json_decode((sql_select_by_id($pdo, "alert_updates", $my_id))["visiting"], true);
        sql_update_by_id($pdo, "alert_updates", $my_id, ["visiting" => $display_json]);
        set_visitors($pdo, $my_id, "delete", $visiting);
        set_visitors($pdo, $my_id, "add", $display);
    }
}

function get_updates($online, $users_ids, $display_json)
{
    $my_id = is_auth();

    if($my_id)
    {
        $pdo = sql_create_pdo();
        sql_update_by_id($pdo, "alert_updates", $my_id, ["online" => $online]);
        if($online === "offline")
            return json_encode(["status" => "offline"]);

        $user_id_to_online = [];
        foreach($users_ids as $user_id)
        {
            $user = sql_select_by_id($pdo, "alert_updates", $user_id);
            if(!$user) continue;
            $user_id_to_online[$user_id] = $user["online"];
        }

        $my_updates_json = (sql_select_by_id($pdo, "alert_updates", $my_id))["updates"];
        $my_updates = json_decode($my_updates_json, true);
        $my_quick_updates_json = (sql_select_by_id($pdo, "alert_updates", $my_id))["quick_updates"];
        $my_quick_updates = json_decode($my_quick_updates_json, true);

        update_visitors($pdo, $my_id, $display_json);
        delete_quick_updates($pdo, $my_id);

        return json_encode(["status" => "ok", "updates" => $my_updates, "quick_updates" => $my_quick_updates, "user_id_to_online" => $user_id_to_online]);
    }
    else
    {
        return json_encode(["status" => "error"]);
    }
}

echo get_updates($online, $users_ids, $display_json);