<?php

namespace daily\model\NameModel;

use daily\model\base\BaseModel\BaseModel;
use JetBrains\PhpStorm\Pure;

class NameModel extends BaseModel
{
    static protected array $table = ['name'];

    #[Pure] public function name(): string
    {
        return $this->field(__FUNCTION__);
    }

    public function paramName(): string
    {
        return 'name';
    }

    static private string $db = <<<A
create table daily_name (
    daily_name_id int primary key auto_increment,
    daily_name_createTime bigint not null,
    daily_name_name varchar(32) unique not null
) charset = utf8 engine = InnoDB;
A;
}