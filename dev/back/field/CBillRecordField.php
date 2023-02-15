<?php

namespace field\CBillRecordField;

use field\IField\IField;
use field\TCategoryField\TCategoryField;
use field\TDateField\TDateField;
use field\TQuantityField\TQuantityField;

$sql = <<<A
CREATE TABLE `daily_billRecord`(
    `daily_billRecord_createTime` bigint NOT NULL,
    `daily_billRecord_id` bigint NOT NULL AUTO_INCREMENT,
    `daily_billRecord_categoryId` bigint NOT NULL,
    `daily_billRecord_quantity` bigint NOT NULL,
    `daily_billRecord_date` bigint NOT NULL,
    PRIMARY KEY (`daily_billRecord_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_as_cs STATS_PERSISTENT = 0;
A;

class CBillRecordField implements IField
{
    use TQuantityField;
    use TDateField;
    use TCategoryField;
}