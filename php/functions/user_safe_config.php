<?php

function user_safe_config($pdo, $user)
{
    $user["img"] = get_img_of_user($pdo, $user);
    unset($user["e_mail"]);
    unset($user["password"]);
    unset($user["files"]);
    return $user;
}