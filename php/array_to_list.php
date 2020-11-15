<?php

function array_to_list($array)
{
    $list = [];
    foreach($array as $cur)
        $list[] = $cur;
    return $list;
}