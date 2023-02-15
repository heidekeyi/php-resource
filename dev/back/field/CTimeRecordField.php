<?php

namespace field\CTimeRecordField;

use field\IField\IField;
use field\TCategoryField\TCategoryField;
use field\TDateField\TDateField;

$sql = <<<A
CREATE TABLE `daily_timeRecord`(
    `daily_timeRecord_createTime` bigint NOT NULL,
    `daily_timeRecord_id` bigint NOT NULL AUTO_INCREMENT,
    `daily_timeRecord_categoryId` bigint NOT NULL,
    `daily_timeRecord_date` bigint NOT NULL,
    `daily_timeRecord_beginTime` bigint NOT NULL,
    `daily_timeRecord_endTime` bigint NOT NULL,
    PRIMARY KEY (`daily_timeRecord_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_as_cs STATS_PERSISTENT = 0;
A;

class CTimeRecordField implements IField
{
    use TDateField;
    use TCategoryField;

    public function beginTime(bool $complete): string
    {
        return $this->complete(__FUNCTION__, $complete);
    }

    public function endTime(bool $complete): string
    {
        return $this->complete(__FUNCTION__, $complete);
    }

}