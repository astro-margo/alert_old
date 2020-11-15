<?php

header("Access-Control-Allow-Origin: http://192.168.1.236:3000");
//header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

require_once "functions/print_r_txt.php";

function f_error_handler($errno, $msg, $file, $line)
{
    print_r_txt("debug1.txt", "error: $msg line: $line file: $file");
}

set_error_handler("f_error_handler", E_ALL);