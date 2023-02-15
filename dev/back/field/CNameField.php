<?php

namespace field\CNameField;

use field\IField\IField;
use field\TNameField\TNameField;

$sql = <<<A
CREATE TABLE `daily_name`(
    `daily_name_createTime` bigint NOT NULL,
    `daily_name_id` bigint NOT NULL AUTO_INCREMENT,
    `daily_name_name` varchar(32) NOT NULL,
    PRIMARY KEY (`daily_name_id`),
    UNIQUE INDEX (`daily_name_name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_as_cs STATS_PERSISTENT = 0;
A;


class CNameField implements IField
{
    use TNameField;
}