<?php

function del_files($pdo, $record)
{
    $files_ids = json_decode($record["files"], true);
    $files = sql_select_by_ids($pdo, "alert_files", "id", $files_ids);

    foreach($files as $file)
    {
        $file_basename = basename($file["url"]);
        $file_name = "./files/" . $file_basename;
        if(file_exists($file_name))
        {
            unlink($file_name);
        }
    }

    sql_delete_by_ids($pdo, "alert_files", $files_ids);
}