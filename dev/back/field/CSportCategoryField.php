<?php

namespace field\CSportCategoryField;

use field\IField\IField;
use field\TNameField\TNameField;
use field\TNameIdField\TNameIdField;

$sql = <<<A
CREATE TABLE `daily_sportCategory`(
    `daily_sportCategory_createTime` bigint NOT NULL,
    `daily_sportCategory_id` bigint NOT NULL AUTO_INCREMENT,
    `daily_sportCategory_nameId` bigint NOT NULL,
    `daily_sportCategory_unitId` bigint NOT NULL,
    PRIMARY KEY (`daily_sportCategory_id`),
    UNIQUE INDEX (`daily_sportCategory_nameId`,`daily_sportCategory_unitId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_as_cs STATS_PERSISTENT = 0;
A;


class CSportCategoryField implements IField
{
    use TNameField;
    use TNameIdField;

    public function unitId(bool $complete): string
    {
        return $this->complete(__FUNCTION__, $complete);
    }

    public function unitName(bool $complete): string
    {
        return $this->complete(__FUNCTION__, $complete);
    }
}