<?php

function is_auth()
{
    $incoming_id = 0;
    if( isset($_COOKIE["e_mail"]) && isset($_COOKIE["password"]) )
    {
        $pdo = sql_create_pdo();
        $users = sql_fetch_all($pdo, "alert_users");
        foreach($users as $user)
        {
            if( ($user["e_mail"] === $_COOKIE["e_mail"]) && ($user["password"] === $_COOKIE["password"]) )
                $incoming_id = $user["id"];
        }
    }
    return $incoming_id;
}