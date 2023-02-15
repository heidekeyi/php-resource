<?php

namespace field\CTimeCategoryField;

use field\IField\IField;
use field\TNameField\TNameField;
use field\TNameIdField\TNameIdField;
use field\TParentField\TParentField;

$sql = <<<A
CREATE TABLE `daily_timeCategory`(
    `daily_timeCategory_createTime` bigint NOT NULL,
    `daily_timeCategory_id` bigint NOT NULL AUTO_INCREMENT,
    `daily_timeCategory_nameId` bigint NOT NULL,
    `daily_timeCategory_parentId` bigint NOT NULL,
    PRIMARY KEY (`daily_timeCategory_id`),
    UNIQUE INDEX (`daily_timeCategory_nameId`,`daily_timeCategory_parentId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_as_cs STATS_PERSISTENT = 0;
A;

class CTimeCategoryField implements IField
{
    use TNameField;
    use TNameIdField;
    use TParentField;
}