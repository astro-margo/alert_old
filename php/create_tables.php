<?php

require_once "sql.php";
require_once "set_updates.php";
require_once "delete_updates.php";
require_once "get_attach_type.php";

$tables = [
    "alert_users" => [
        "id" => "int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL",
        "name" => "tinytext NOT NULL",
        "surname" => "tinytext NOT NULL",
        "e_mail" => "tinytext NOT NULL",
        "password" => "tinytext NOT NULL",
        "files" => "tinytext NOT NULL",
    ],
    "alert_posts" => [
        "id" => "int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL",
        "user_id" => "int(10) NOT NULL",
        "date" => "tinytext NOT NULL",
        "ip" => "tinytext NOT NULL",
        "text" => "text NOT NULL",
        "files" => "text NOT NULL",
        "recall" => "tinytext NOT NULL"
    ],
    "alert_chats" => [
        "id" => "int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL",
        "user_id" => "int(10) NOT NULL",
        "chat_name" => "tinytext NOT NULL",
        "participants" => "text NOT NULL",
        "last_update" => "tinytext NOT NULL",
        "inviters" => "text NOT NULL"
    ],
    "alert_messages" => [
        "id" => "int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL",
        "user_id" => "int(10) NOT NULL",
        "chat_id" => "int(10) NOT NULL",
        "date" => "tinytext NOT NULL",
        "ip" => "tinytext NOT NULL",
        "text" => "text NOT NULL",
        "files" => "text NOT NULL",
        "recall" => "tinytext NOT NULL"
    ],
    "alert_my_chats" => [
        "id" => "int(10) NOT NULL",
        "chats" => "text NOT NULL"
    ],
    "alert_comments" => [
        "id" => "int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL",
        "user_id" => "int(10) NOT NULL",
        "post_id" => "int(10) NOT NULL",
        "date" => "tinytext NOT NULL",
        "ip" => "tinytext NOT NULL",
        "text" => "text NOT NULL",
        "files" => "text NOT NULL",
        "recall" => "tinytext NOT NULL"
    ],
    "alert_files" => [
        "id" => "int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL",
        "user_id" => "int(10) NOT NULL",
        "type" => "tinytext NOT NULL",
        "url" => "tinytext NOT NULL",
        "date" => "tinytext NOT NULL",
        "target" => "tinytext NOT NULL"
    ],
    "alert_updates" => [
        "id" => "int(10) NOT NULL",
        "updates" => "text NOT NULL",
        "online" => "tinytext NOT NULL",
        "visiting" => "tinytext NOT NULL",
        "quick_updates" => "tinytext NOT NULL"
    ],
    "alert_follows" => [
        "id" => "int(10) NOT NULL",
        "follows" => "text NOT NULL"
    ],
    "alert_followers" => [
        "id" => "int(10) NOT NULL",
        "followers" => "text NOT NULL"
    ],
    "alert_friends" => [
        "id" => "int(10) NOT NULL",
        "friends" => "text NOT NULL"
    ],
    "alert_messages_visitors" => [
        "id" => "int(10) NOT NULL",
        "visitors" => "text NOT NULL"
    ],
    "alert_chats_visitors" => [
        "id" => "int(10) NOT NULL",
        "visitors" => "text NOT NULL"
    ],
    "alert_comments_visitors" => [
        "id" => "int(10) NOT NULL",
        "visitors" => "text NOT NULL"
    ]
];


$pdo = sql_create_pdo();

foreach($tables as $table => $fields)
{
 //   sql_create_table($pdo, $table, $fields);
 //   echo $table . " created" . "<br />";
    sql_delete_table($pdo, $table);
    echo $table . " deleted" . "<br />";
}

//insert into alert_files values(0, 0, "image/jpeg", "http://localhost/alert/php/files/0.jpg", "account_img");

//sql_insert($pdo, "alert_users", ["null", "max", "mg", "mg42ms1", "123"]);
//print_r(sql_fetch_posts($pdo, 7));
//print_r(sql_fetch_comments($pdo, 1));
//echo sql_delete_by_id($pdo, "alert_posts", 4);
//echo sql_insert_file($pdo, 50, "image/gif", "astro-margo");
//print_r(sql_insert_file($pdo, 50, "image/gif", "localhost/php/files/", "fire.jpg", "none"));
//print_r(sql_select_by_ids($pdo, "alert_files", []));
//sql_delete_comments_by_post_id($pdo, 13);
//sql_delete_by_ids($pdo, "alert_users", [9, 10]);
//sql_delete($pdo, "alert_users", "e_mail", "2");
//print_r(array_merge([["name"=>"max", "type"=>"posts", "id"=>5]], [["name"=>"max", "type"=>"posts", "id"=>5]]));
//insert into alert_users values(null, "Max", "Gorbunov", "mg42ms1@gmail.com", "12345");
//update alert_users set name="Qwery", surname="opa", e_mail="mail", password="pwsw", img="none" where id=1;
//sql_update_by_id($pdo, "alert_users", 1, ["name"=>"Qwery1", "surname"=>"op1a", "e_mail"=>"ma1il", "password"=>"p1wsw", "img"=>0]);
//set_updates($pdo, "comments", 9);
//echo (sql_select_by_id($pdo, "alert_updates", 3))["updates"];
//delete_updates($pdo, 1, "comments", "2");
//sql_update_by_id($pdo, "alert_follows", 1, ["id" => 1, "follows" => "[2]"]);
//print_r(get_attached_users_ids($pdo, 1, "follows"));
//echo ([] == false);
/*
echo "<pre>";
print_r( sql_select($pdo, "alert_users", "e_mail", "mg42ms1") );
echo "</pre>";
*/