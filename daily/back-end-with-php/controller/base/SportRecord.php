<?php

namespace daily\controller\base\SportRecord;

use daily\model\NameModel\NameModel;
use daily\model\SportRecordModel\SportRecordModel;
use daily\model\UnitModel\UnitModel;
use JetBrains\PhpStorm\Pure;

trait SportRecord
{
    #[Pure] private function initField(SportRecordModel $model): string
    {
        $field = [
            $model->id() . ' as ' . $model->paramId(),
            $model->createTime() . ' as ' . $model->paramCreateTime(),
            $model->amount() . ' as ' . $model->paramAmount(),
            $model->date() . ' as ' . $model->paramDate(),
            'u.' . $model->paramUnitName(),
            'u.' . $model->paramUnitId(),
            'c.' . $model->paramCategoryId(),
            'c.' . $model->paramCategoryName(),
        ];
        return join(',', $field);
    }

    #[Pure] private function initSqlUnit(SportRecordModel $model, UnitModel $unitModel, NameModel $nameModel): string
    {
        $field = [
            $unitModel->id() . ' as ' . $model->paramUnitId(),
            $nameModel->name() . ' as ' . $model->paramUnitName(),
        ];
        $sql = [
            'select',
            join(',', $field),
            'from',
            $unitModel->table(),
            'left join',
            $nameModel->table(),
            'on',
            $nameModel->id() . '=' . $unitModel->nameId(),
        ];
        return join(' ', $sql);
    }
}