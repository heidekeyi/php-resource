<?php

namespace daily\model\UnitModel;

use daily\model\base\BaseNameModel\BaseNameModel;

class UnitModel extends BaseNameModel
{
    static protected array $table = ['unit'];
    static private string $db = <<<A
create table daily_unit (
    daily_unit_id int primary key auto_increment,
    daily_unit_createTime bigint not null,
    daily_unit_nameId int unique not null
) charset = utf8 engine = InnoDB;
A;
}