<?php

namespace field\CBillCategoryField;

use field\IField\IField;
use field\TNameField\TNameField;
use field\TNameIdField\TNameIdField;
use field\TParentField\TParentField;

$sql = <<<A
CREATE TABLE `daily_billCategory`(
    `daily_billCategory_createTime` bigint NOT NULL,
    `daily_billCategory_id` bigint NOT NULL AUTO_INCREMENT,
    `daily_billCategory_nameId` bigint NOT NULL,
    `daily_billCategory_parentId` bigint NOT NULL,
    PRIMARY KEY (`daily_billCategory_id`),
    UNIQUE INDEX (`daily_billCategory_nameId`,`daily_billCategory_parentId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_as_cs STATS_PERSISTENT = 0;
A;

class CBillCategoryField implements IField
{
    use TNameField;
    use TNameIdField;
    use TParentField;
}