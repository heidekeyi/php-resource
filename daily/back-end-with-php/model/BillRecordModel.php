<?php

namespace daily\model\BillRecordModel;

use daily\model\base\BaseAmountAndDateModel\BaseAmountAndDateModel;

class BillRecordModel extends BaseAmountAndDateModel
{
    static protected array $table = ['bill', 'record'];
    static private string $db = <<<A
create table daily_bill_record (
    daily_bill_record_id int primary key auto_increment,
    daily_bill_record_createTime bigint not null,
    daily_bill_record_categoryId int not null,
    daily_bill_record_amount int not null,
    daily_bill_record_date bigint not null
) charset = utf8 engine = InnoDB;
A;
}