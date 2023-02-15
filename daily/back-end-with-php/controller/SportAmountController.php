<?php

namespace daily\controller\SportAmountController;

use daily\controller\base\BaseSportCalibrationController\BaseSportCalibrationController;
use daily\controller\base\SportRecord\SportRecord;
use daily\controller\base\Category\Category;

class SportAmountController extends BaseSportCalibrationController
{
    use Category;
    use SportRecord;

    private function sql(): string
    {
        $nameModel = $this->nameModel();
        $categoryModel = $this->categoryModel();
        $unitModel = $this->unitModel();
        $model = $this->model();
        $sqlCategory = $this->initSqlCategory($model, $categoryModel, $nameModel);
        $sqlUnit = $this->initSqlUnit($model, $unitModel, $nameModel);
        $field = [
            'sum(' . $model->amount() . ') as ' . $model->paramAmount(),
            'u.' . $model->paramUnitName(),
            'u.' . $model->paramUnitId(),
            'c.' . $model->paramCategoryId(),
            'c.' . $model->paramCategoryName(),
        ];
        $field = join(',', $field);
        $sql = [
            'select',
            $field,
            'from',
            $model->table(),
            'left join',
            '(' . $sqlUnit . ')' . ' as u',
            'on',
            $model->unitId() . '=u.' . $model->paramUnitId(),
            'left join',
            '(' . $sqlCategory . ')' . ' as c',
            'on',
            $model->categoryId() . '=c.' . $model->paramCategoryId(),
            'where',
            $model->date(),
            '>=?',
            'and',
            $model->date(),
            '<=?',
            'group by',
            join(',', [$model->categoryId(), $model->unitId()]),
            'order by',
            $model->categoryId(),
            'asc'
        ];
        return join(' ', $sql);
    }

    protected function fetch(): array
    {
        $sql = $this->sql();
        $values = [$this->beginTime, $this->endTime];
        return $this->db()->select($sql, $values);
    }
}