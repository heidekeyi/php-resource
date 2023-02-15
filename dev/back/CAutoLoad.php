<?php

namespace CAutoLoad;

class CAutoLoad
{
    static private bool $once;

    static public function register(): void
    {
        if (!empty(static::$once)) {
            return;
        }
        static::$once = true;
        spl_autoload_register(function (string $cls) {
            $cls = preg_replace("/\\\\\w+$/", '', $cls);
            $dir = str_replace('\\', '/', $cls);
            $pathname = __DIR__ . '/' . $cls . '.php';
            if (file_exists($pathname)) {
                include_once $pathname;
            }
        });
    }
}
