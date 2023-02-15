<?php

namespace daily\Autoload;

class Autoload
{
    static public function register()
    {
        spl_autoload_register(function ($className) {
            $path = str_replace('\\', '/', $className);
            $path = trim($path, '/');
            //    trim begin word and end word (ex: aa/zz/bb=>/zz)
            $reg = '/\w+(\/.*)\/\w+$/';
            $rep = '$1';
            $name = preg_replace($reg, $rep, $path);
            //    prefix path
            $prefix = dirname(__FILE__);
            //    filename extend
            $suffix = '.php';
            $pathname = $prefix . $name . $suffix;
            $pathname = str_replace('\\', '/', $pathname);
            if (file_exists($pathname)) {
                include_once $pathname;
            }
        });
    }
}

Autoload::register();
