<?php

function traverse(string $pathname): array
{
    $list = [];
    $handle = opendir($pathname);
    if ($handle === false) {
        return $list;
    }
    while ($path = readdir($handle)) {
        if (str_starts_with($path, '.')) {
            continue;
        }
        $path = $pathname . '\\' . $path;
        if (is_dir($path)) {
            $list = [...$list, ...traverse($path)];
        } else {
            $list[] = $path;
        }
    }
    closedir($handle);
    return $list;
}

function display(array $list): void
{
    foreach ($list as $item) {
        echo $item;
        echo PHP_EOL;
    }
}

$pathname = 'D:\\tv\\日语\\大家的日语\\video';
$list = traverse($pathname);
//display($list);
$paths = [];
foreach ($list as $item) {
    //trim mp3..
    $pathname = $item;
    $item = preg_replace('/MP3_\d{0,3}\s{0,3}/', '', $item);
    $item = preg_replace('/[【】]/', '', $item);

    if (preg_match('/第\d课会话\.mp3$/', $item)) {
        $item = preg_replace('/第(\d)课会话\.mp3$/', '第0$1课_11_会话.mp3', $item);
        rename($pathname,  $item);
        $paths[] = $item;
        continue;
    }

    if (preg_match('/第\d\d课会话\.mp3$/', $item)) {
        $item = preg_replace('/第(\d\d)课会话\.mp3$/', '第$1课_11_会话.mp3', $item);
        rename($pathname,  $item);
        $paths[] = $item;
    }

    if (preg_match('/第\d课问题\d\.mp3$/', $item)) {
        $item = preg_replace('/第(\d)课问题(\d)\.mp3$/', '第$1课_2$2_问题$2.mp3', $item);
        rename($pathname,  $item);
        $paths[] = $item;
    }

    if (preg_match('/第\d课_\d\d_问题\d.mp3$/', $item)) {
        $item = preg_replace('/第(\d)/', '第0$1', $item);
        rename($pathname,  $item);
        $paths[] = $item;
    }

    if (preg_match('/第\d\d课问题\d\.mp3$/', $item)) {
        $item = preg_replace('/问题(\d)/', '_2$1_问题$1', $item);
        rename($pathname,  $item);
        $paths[] = $item;
    }

    if (preg_match('/\\\\第\d\d课单词\.mp3$/', $item)) {
        $item = preg_replace('/第(\d\d)课/', '大家的日语（第二版）第$1课', $item);
        rename($pathname,  $item);
        $paths[] = $item;
    }

    if (preg_match('/\\\\第\d课单词\.mp3$/', $item)) {
        $item = preg_replace('/第(\d)/', '第0$1', $item);
        rename($pathname,  $item);
        $paths[] = $item;
    }

    if (preg_match('/\\\\大家的日语\d（第二版）/', $item)) {
        $item = preg_replace('/大家的日语\d（第二版）/', '', $item);
        rename($pathname,  $item);
        $paths[] = $item;
    }
}
display($paths);



