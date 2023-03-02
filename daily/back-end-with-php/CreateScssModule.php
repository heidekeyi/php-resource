<?php

class CreateScssModule
{
    static string $msSrcPath = 'D:\project\php\dev\front\src\assets';

    function createIconGlobalModule(array $paths): CreateScssModule
    {
        $paths = [...explode('\\', static::$msSrcPath), ...$paths, 'iconfont.css'];
        $filename = implode('/', $paths);
        if (!file_exists($filename)) {
            echo 'error: can not found ' . $filename . PHP_EOL;
            return $this;
        }
        $sub = file_get_contents($filename);
        if (!$sub) {
            echo 'error: can not read ' . $filename . PHP_EOL;
            return $this;
        }
        $sub = str_replace("\r", '', $sub);
        $lines = explode("\n", $sub);
        $names = [];
        $tmp = $lines;
        $lines = [];
        foreach ($tmp as $it) {
            if (str_ends_with($it, 'font-size: 16px;')) {
                continue;
            }
            $sub = '.';
            if (str_starts_with($it, $sub)) {
                $sub = '%-';
                $it = preg_replace('/^\./', $sub, $it);
                $sub .= 'icon-';
                if (str_starts_with($it, $sub)) {
                    $name = preg_replace('/^' . $sub . '(\w+).*/', '$1', $it);
                    $names[] = $name;
                }
            }
            $lines[] = $it;
        }
        foreach ($names as $it) {
            $lines[] = <<<_
.{$it} {
  @extend %-iconfont;
  @extend %-icon-{$it};
}\n
_;
        }
        $filename = str_replace('font.css', '.global.module.scss', $filename);
        $sub = implode("\n", $lines);
        if (!file_put_contents($filename, $sub)) {
            echo 'error: can not write ' . $filename . PHP_EOL;
            return $this;
        }
        return $this;
    }

    function createInterfaceModule(array $pathsList): void
    {

    }
}

$ob = new CreateScssModule();
$pathsList = [['icon'], ['lib'], ['app']];
$ob->createIconGlobalModule($pathsList[0])
    ->createInterfaceModule($pathsList);