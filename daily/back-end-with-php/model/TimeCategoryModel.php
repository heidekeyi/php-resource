<?php

namespace daily\model\TimeCategoryModel;

use daily\model\base\BaseParentModel\BaseParentModel;

class TimeCategoryModel extends BaseParentModel
{
    static protected array $table = ['time', 'category'];
    static private string $db = <<<A
create table daily_time_category (
    daily_time_category_id int primary key auto_increment,
    daily_time_category_createTime bigint not null,
    daily_time_category_parentId int not null,
    daily_time_category_nameId int unique not null
) charset = utf8 engine = InnoDB;
A;
}