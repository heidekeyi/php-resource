<?php

namespace daily\controller\base\BaseAmountAndDateController;

use daily\controller\base\BaseCategoryController\BaseCategoryController;
use daily\model\base\BaseAmountAndDateModel\BaseAmountAndDateModel;

abstract class BaseAmountAndDateController extends BaseCategoryController
{
    abstract protected function model(): BaseAmountAndDateModel;

    protected function queryDate(array $where, array $values): array
    {
        $model = $this->model();
        $field = $model->date();
        list ($w, $v) = $this->categoryDate($model->paramDate(), $field, $field);
        $where = [...$where, ...$w];
        $values = [...$values, ...$v];
        return [$where, $values];
    }

    protected function uniqueKeys(): array
    {
        return [];
    }
}