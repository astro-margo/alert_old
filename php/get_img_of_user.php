<?php

function get_img_of_user($pdo, $user)
{
    $img_id = $user["files"];

    if($img_id === "[0]") return 0;
    else 
    {
        $img_id = (json_decode($img_id, true))[0];
        return (sql_select_by_id($pdo, "alert_files", $img_id))["url"];
    }
}