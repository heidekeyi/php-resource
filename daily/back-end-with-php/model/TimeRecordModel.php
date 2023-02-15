<?php

namespace daily\model\TimeRecordModel;

use daily\model\base\BaseCategoryModel\BaseCategoryModel;
use JetBrains\PhpStorm\Pure;

class TimeRecordModel extends BaseCategoryModel
{
    static protected array $table = ['time', 'record'];

    #[Pure] public function beginTime(): string
    {
        return $this->field(__FUNCTION__);
    }

    #[Pure] public function endTime(): string
    {
        return $this->field(__FUNCTION__);
    }

    public function paramBeginTime(): string
    {
        return 'beginTime';
    }

    public function paramEndTime(): string
    {
        return 'endTime';
    }

    static private string $db = <<<A
create table daily_time_record (
    daily_time_record_id int primary key auto_increment,
    daily_time_record_createTime bigint not null,
    daily_time_record_categoryId int not null,
    daily_time_record_beginTime bigint not null,
    daily_time_record_endTime bigint not null
) charset = utf8 engine = InnoDB;
A;
}