<?php

require_once "sql.php";
require_once "is_auth.php";
require_once "accept_files.php";
require_once "get_img_of_user.php";
require_once "msg_is_deletable.php";
require_once "set_updates.php";
require_once "delete_updates.php";
require_once "access_allow_origin.php";
require_once "news.php";
require_once "functions/get_post_user_id.php";
require_once "functions/get_visitors.php";
require_once "chats/get_chat_participance.php";

function recall_backtrace($pdo, $recall_json)
{
    if($recall_json === "none")
        return [];
    $recall = json_decode($recall_json, true);

    $type = $recall["type"];
    $id = $recall["id"];

    $recall = sql_select_by_id($pdo, "alert_" . $recall["type"], $recall["id"]);
    if(!$recall)
        return [];
    $user = sql_select_by_id($pdo, "alert_users", $recall["user_id"]);
    $recall["name"] = $user["name"];
    $recall["surname"] = $user["surname"];
    $recall["img"] = get_img_of_user($pdo, $user);
    $recall["files"] = sql_select_by_ids($pdo, "alert_files", "id", json_decode($recall["files"], true));
    $recall["msg_type"] = $type;
    $message["deletable"] = false;

    return array_merge([$recall], recall_backtrace($pdo, $recall["recall"]));
}

function get_recall($pdo, $recall_json)
{
    if($recall_json === "none")
        return "none";
    $recall = json_decode($recall_json, true);

    $type = $recall["type"];

    $recall = sql_select_by_id($pdo, "alert_" . $recall["type"], $recall["id"]);
    if(!$recall)
        return "none";
    $recall["files"] = sql_select_by_ids($pdo, "alert_files", "id", json_decode($recall["files"], true));

    $user = sql_select_by_id($pdo, "alert_users", $recall["user_id"]);
    $recall["name"] = $user["name"];
    $recall["surname"] = $user["surname"];
    $recall["img"] = get_img_of_user($pdo, $user);
    $recall["recall_backtrace"] = recall_backtrace($pdo, $recall["recall"]);
    $recall["msg_type"] = $type;
    $message["deletable"] = false;
    unset($recall["recall"]);
    return $recall;
}

$my_id = is_auth();

if($my_id)
{
    if(isset($_GET["user_id"]))
        $user_id = $_GET["user_id"];

    $msg_type = $_POST["type"];
    if(isset($_POST["text"]))
    {
        $text = $_POST["text"];
    }

    $pdo = sql_create_pdo();
    if(isset($_FILES["files"]))
    {
        $files = accept_files($pdo, $my_id, $_FILES["files"], $msg_type);
    }

    if(isset($_POST["recall"]))
    {
        $recall = $_POST["recall"];
    }


    if(isset($text) || isset($files) || isset($recall))
    {
        $time = "" . time();
        if(!isset($files)) $files = [];
        if(!isset($recall)) $recall = "none";
        if(!isset($text)) $text = " ";
        $text = addslashes($text);
        if($msg_type === "posts")
            $values = ["null", $my_id, $time, $_SERVER["REMOTE_ADDR"], $text, json_encode($files, JSON_UNESCAPED_UNICODE), $recall];
        if($msg_type === "comments")
            $values = ["null", $my_id, $_POST["post_id"], $time, $_SERVER["REMOTE_ADDR"], $text, json_encode($files, JSON_UNESCAPED_UNICODE), $recall];
        if($msg_type === "messages")
            $values = ["null", $my_id, $_POST["chat_id"], $time, $_SERVER["REMOTE_ADDR"], $text, json_encode($files, JSON_UNESCAPED_UNICODE), $recall];

        if($msg_type === "comments")
        {
            set_updates($pdo, get_post_user_id($pdo, $_POST["post_id"]), $msg_type, $_POST["post_id"]);
            $visitors = get_visitors($pdo, "comments", $_POST["post_id"]);
            foreach($visitors as $visitor)
                set_updates($pdo, $visitor, $msg_type, $_POST["post_id"], true);
            sql_insert($pdo, "alert_" . $msg_type, $values);
        }
        if($msg_type === "posts")
        {
            set_news_updates($pdo, $my_id);
            sql_insert($pdo, "alert_" . $msg_type, $values);
        }
        if($msg_type === "messages" && get_chat_participance($pdo, 0, $_POST["chat_id"], $my_id) === "participants")
        {
            $chat_participants = json_decode((sql_select_by_id($pdo, "alert_chats", $_POST["chat_id"]))["participants"], true);
            $key = array_search($my_id, $chat_participants);
            unset($chat_participants[$key]);
            foreach($chat_participants as $chat_participant)
                set_updates($pdo, $chat_participant, $msg_type, $_POST["chat_id"]);
            sql_update_by_id($pdo, "alert_chats", $_POST["chat_id"], ["last_update" => $time]);
            sql_insert($pdo, "alert_" . $msg_type, $values);
        }
    }

    if($msg_type === "news")
    {
        $messages = get_news($pdo, $my_id);
        delete_updates($pdo, $my_id, "news", "all");
    }
    if($msg_type === "posts")
    {
        $messages = sql_fetch_posts($pdo, $user_id);
        delete_updates($pdo, $my_id, "news", $user_id);
    }
    if($msg_type === "comments")
    {
        $messages = sql_fetch_comments($pdo, $_POST["post_id"]);
        delete_updates($pdo, $my_id, $msg_type, $_POST["post_id"]);
    }
    if($msg_type === "messages")
    {
        $messages = sql_select($pdo, "alert_messages", "chat_id", $_POST["chat_id"]);
        delete_updates($pdo, $my_id, $msg_type, $_POST["chat_id"]);
        delete_updates($pdo, $my_id, "del_message", "all");
    }
    foreach($messages as &$message)
    {
        $message["files"] = sql_select_by_ids($pdo, "alert_files", "id", json_decode($message["files"], true));
        $user = sql_select_by_id($pdo, "alert_users", $message["user_id"]);
        $message["name"] = $user["name"];
        $message["surname"] = $user["surname"];
        $message["img"] = get_img_of_user($pdo, $user);
        $message["recall"] = get_recall($pdo, $message["recall"]);
        if($msg_type === "news") $message["msg_type"] = "posts";
        else $message["msg_type"] = $msg_type;
        $message["deletable"] = msg_is_deletable($pdo, $message, $msg_type, $my_id);
    }

    
    echo json_encode(["status" => "ok", "data" => $messages, "my_id" => $my_id]);

}
else
{
    echo json_encode(["status" => "error"]);
}