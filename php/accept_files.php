<?php

function accept_files($pdo, $user_id, $files, $target)
{
 //   $host_path = "https://astro-margo.ru/alert/php/files/";
    $host_path = "http://192.168.1.236/alert/php/files/";
 //   $host_path = "http://localhost/alert/php/files/";
    for($i=0; $i<count(($files)["error"]); $i++)
    {
        if($files["error"][$i] === 0 && $files["size"][$i]>0)
        {
            $file_type =  $files["type"][$i];
            $file_name = $files["name"][$i];
            $new_file = sql_insert_file($pdo, $user_id, $file_type, $host_path, $file_name, $target);
            move_uploaded_file($files["tmp_name"][$i], "./files/" . $new_file["id"] . $new_file["extension"]);
            $input_files[] = $new_file["id"];
        }
    }
    return $input_files;
}

