<?php

namespace daily\controller\SportTraceController;

use daily\controller\base\BaseSportCalibrationController\BaseSportCalibrationController;
use daily\controller\base\SportRecord\SportRecord;
use daily\controller\base\Category\Category;

class SportTraceController extends BaseSportCalibrationController
{
    use Category;
    use SportRecord;

    private function sql(): string
    {
        $nameModel = $this->nameModel();
        $categoryModel = $this->categoryModel();
        $model = $this->model();
        $sqlCategory = $this->initSqlCategory($model, $categoryModel, $nameModel);
        $field = [
            'sum(' . $model->amount() . ') as ' . $model->paramAmount(),
            $model->date() . ' as ' . $model->paramDate(),
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
            join(',', [$model->date(), $model->categoryId(), $model->unitId()]),
            'order by',
            $model->date(),
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