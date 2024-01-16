<?php

if( !isset($_SERVER['HTTP_REFERER']) ){
    header("HTTP/1.0 404 Not Found");
    exit();
}

/*
 * 
 *  This is fake subscribe!
 * 
 */
sleep(2);