<?php

namespace daily\model\SportRecordModel;


use daily\model\base\BaseAmountAndDateModel\BaseAmountAndDateModel;
use JetBrains\PhpStorm\Pure;

class SportRecordModel extends BaseAmountAndDateModel
{
    static protected array $table = ['sport', 'record'];

    #[Pure] public function unitId(): string
    {
        return $this->field(__FUNCTION__);
    }

    #[Pure] public function unitName(): string
    {
        return $this->field(__FUNCTION__);
    }

    public function paramUnitId(): string
    {
        return 'unitId';
    }

    public function paramUnitName(): string
    {
        return 'unitName';
    }

    static private string $db = <<<A
create table daily_sport_record (
    daily_sport_record_id int primary key auto_increment,
    daily_sport_record_createTime bigint not null,
    daily_sport_record_categoryId int not null,
    daily_sport_record_unitId int not null,
    daily_sport_record_amount int not null,
    daily_sport_record_date bigint not null
) charset = utf8 engine = InnoDB;
A;
}