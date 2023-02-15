<?php

namespace daily\controller\base\Category;

use daily\model\base\BaseCategoryModel\BaseCategoryModel;
use daily\model\base\BaseNameModel\BaseNameModel;
use daily\model\NameModel\NameModel;
use JetBrains\PhpStorm\Pure;

trait Category
{
    #[Pure] private function initSqlCategory(BaseCategoryModel $model, BaseNameModel $categoryModel, NameModel $nameModel): string
    {
        $field = [
            $categoryModel->id() . ' as ' . $model->paramCategoryId(),
            $nameModel->name() . ' as ' . $model->paramCategoryName(),
        ];
        $sql = [
            'select',
            join(',', $field),
            'from',
            $categoryModel->table(),
            'left join',
            $nameModel->table(),
            'on',
            $nameModel->id() . '=' . $categoryModel->nameId(),
        ];
        return join(' ', $sql);
    }
}