<?php

function sql_create_pdo()
{
    return $pdo = new PDO("mysql:host=localhost;dbname=test", "root", "", [PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING]);
  //  return $pdo = new PDO("mysql:host=localhost;dbname=u0859366_default", "u0859366_default", "A32FWxU!", [PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING]);
}

function sql_create_table($pdo, $name, $fields)
{
    $sql = "create table if not exists " . $name . "(";
    foreach($fields as $field_name => $field_type)
    {
        $sql = $sql . "$field_name $field_type,";
    }
    $sql = rtrim($sql, ",");
    $sql = $sql . ")";
    $res = $pdo->prepare($sql);
    return $res->execute();
}

function sql_delete_table($pdo, $table)
{
    $sql = "drop table if exists $table";
    $res = $pdo->prepare($sql);
    return $res->execute();
}

function sql_insert($pdo, $table, $values)
{
    $sql = "insert into $table values (";
    $len = count($values);
    for($i=0; $i<$len; $i++)
    {
        $val = $values[$i];
        if($val === "null" || is_integer($val))
            $sql = $sql . "$val,";
        else
            $sql = $sql . "'$val',";
    }
    $sql = rtrim($sql, ",");
    $sql = $sql . ")";
    $res = $pdo->prepare($sql);
    return $res->execute();
}

function sql_fetch_all($pdo, $table)
{
    $sql = "select * from $table";
    $res = $pdo->prepare($sql);
    $res->execute();
    return $res->fetchAll(PDO::FETCH_ASSOC);
}

function sql_select_by_id($pdo, $table, $id)
{
    $sql = "select * from $table where id=$id";
    $res = $pdo->prepare($sql);
    $res->execute();
    return $res->fetch(PDO::FETCH_ASSOC);
}

function sql_select($pdo, $table, $field, $value)
{
    $sql = "select * from $table where $field='$value'";
    $res = $pdo->prepare($sql);
    $res->execute();
    return $res->fetchAll(PDO::FETCH_ASSOC);
}

function sql_fetch_posts($pdo, $user_id)
{
    $sql = "select * from alert_posts where user_id=$user_id order by date desc";
    $res = $pdo->prepare($sql);
    $res->execute();
    return $res->fetchAll(PDO::FETCH_ASSOC);
}

function sql_fetch_chats($pdo, $chats_ids)
{
    if(count($chats_ids) === 0)
        return [];
    $sql = "select * from alert_chats where";          
    foreach($chats_ids as $chat_id)
    {
        $sql = $sql . " id=$chat_id or";
    }
    $sql = rtrim($sql, "or");
    $sql = $sql . " order by last_update desc";
    $res = $pdo->prepare($sql);
    $res->execute();
    return $res->fetchAll(PDO::FETCH_ASSOC);
}

function sql_fetch_comments($pdo, $post_id)
{
    $sql = "select * from alert_comments where post_id=$post_id order by date";
    $res = $pdo->prepare($sql);
    $res->execute();
    return $res->fetchAll(PDO::FETCH_ASSOC);
}

function sql_delete_by_id($pdo, $table, $id)
{
    $sql = "delete from $table where id=$id";
    $res = $pdo->prepare($sql);
    return $res->execute();
}

function sql_insert_file($pdo, $user_id, $type, $host_path, $file_name, $target)
{
    $time = time();
    $splits = explode(".", $file_name);
    $extension = "." . $splits[count($splits)-1];
    $sql = "select id from alert_files order by id desc limit 1";
    $res = $pdo->prepare($sql);
    $res->execute();
    $record = $res->fetch(PDO::FETCH_ASSOC);
    if(!$record)
        $file_id = 1;
    else
        $file_id = $record["id"] + 1;
    $url = $host_path . $file_id . $extension;

    sql_insert($pdo, "alert_files", [$file_id, $user_id, $type, $url, "$time", $target]);

    $res = $pdo->prepare($sql);
    $res->execute();
    return ["id" => $file_id, "extension" => $extension];
}

function sql_last_id($pdo, $table)
{
    $sql = "select id from $table order by id desc limit 1";
    $res = $pdo->prepare($sql);
    $res->execute();
    $last_record = $res->fetch(PDO::FETCH_ASSOC);
    if(!$last_record)
        return 0;
    $last_id = $last_record["id"];
    return $last_id;
}


function sql_select_by_ids($pdo, $table, $id_name, $ids)
{
    if(count($ids) === 0)
        return [];
    $sql = "select * from $table where";
    foreach($ids as $id)
    {
        $sql = $sql . " $id_name=$id or";
    }
    $sql = rtrim($sql, " or");
    $res = $pdo->prepare($sql);
    $res->execute();
    return $res->fetchAll(PDO::FETCH_ASSOC);
}


function sql_delete_by_ids($pdo, $table, $ids)
{
    if(count($ids) === 0)
        return 0;
    $sql = "delete from $table where";
    foreach($ids as $id)
    {
        $sql = $sql . " id=$id or";
    }
    $sql = rtrim($sql, " or");
    $res = $pdo->prepare($sql);
    return $res->execute();
}


function sql_delete($pdo, $table, $field, $value)
{
    $sql = "delete from $table where $field=$value";
    $res = $pdo->prepare($sql);
    return $res->execute();
}

function sql_update_by_id($pdo, $table, $id, $values)
{
    $sql = "update $table set";
    foreach($values as $key=>$value)
    {
        $sql = $sql . " $key='$value',";
    }
    $sql = rtrim($sql, ',');
    $sql = $sql . " where id=$id";
    $res = $pdo->prepare($sql);
    return $res->execute();
}

function sql_fetch_users($pdo)
{
    $sql = "select id, name, surname, files from alert_users";
    $res = $pdo->prepare($sql);
    $res->execute();
    return $res->fetchAll(PDO::FETCH_ASSOC);
}