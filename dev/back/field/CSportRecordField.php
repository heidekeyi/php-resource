<?php

namespace field\CSportRecordField;

use field\IField\IField;
use field\TCategoryField\TCategoryField;
use field\TDateField\TDateField;
use field\TQuantityField\TQuantityField;

$sql = <<<A
CREATE TABLE `daily_sportRecord`(
    `daily_sportRecord_createTime` bigint NOT NULL,
    `daily_sportRecord_id` bigint NOT NULL AUTO_INCREMENT,
    `daily_sportRecord_categoryId` bigint NOT NULL,
    `daily_sportRecord_quantity` bigint NOT NULL,
    `daily_sportRecord_date` bigint NOT NULL,
    PRIMARY KEY (`daily_sportRecord_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_as_cs STATS_PERSISTENT = 0;
A;

class CSportRecordField implements IField
{
    use TQuantityField;
    use TDateField;
    use TCategoryField;
}