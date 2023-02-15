<?php

namespace daily\model\base\BaseModel;

use JetBrains\PhpStorm\Pure;

class BaseModel
{
    static protected string $project = 'daily';
    static protected string $needle = '_';
    static protected array $table = [];

    public function needle(): string
    {
        return static::$needle;
    }

    public function table(): string
    {
        return join(static::$needle, [static::$project, ...static::$table]);
    }

    #[Pure] public function id(): string
    {
        return $this->field(__FUNCTION__);
    }

    #[Pure] public function createTime(): string
    {
        return $this->field(__FUNCTION__);
    }

    protected function field(string $filed): string
    {
        return join(static::$needle, [static::$project, ...static::$table, $filed]);
    }

    public function paramId(): string
    {
        return 'id';
    }
    public function paramCreateTime(): string
    {
        return 'createTime';
    }
}