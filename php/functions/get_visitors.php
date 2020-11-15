<?php

function get_visitors($pdo, $section, $id)
{
    $visitors_record = sql_select_by_id($pdo, "alert_{$section}_visitors", $id);
    if(!$visitors_record)
        return [];
    $visitors = json_decode($visitors_record["visitors"], true);
    return $visitors;
}