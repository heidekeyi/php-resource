<?php

namespace CHeader;

class CHeader
{
    static private bool $once;

    static public function header(): void
    {
        if (!empty(static::$once)) {
            return;
        }
        header('Content-Type: application/json; charset=utf-8');
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: *");
        static::$once = true;
    }
}
