<?php

namespace daily\model\BillCategoryModel;

use daily\model\base\BaseParentModel\BaseParentModel;

class BillCategoryModel extends BaseParentModel
{
    static protected array $table = ['bill', 'category'];
    static private string $db = <<<A
create table daily_bill_category (
    daily_bill_category_id int primary key auto_increment,
    daily_bill_category_createTime bigint not null,
    daily_bill_category_parentId int not null,
    daily_bill_category_nameId int unique not null
) charset = utf8 engine = InnoDB;
A;
}