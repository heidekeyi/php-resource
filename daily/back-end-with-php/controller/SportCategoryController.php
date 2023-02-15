<?php

namespace daily\controller\SportCategoryController;

use daily\controller\base\BaseNameController\BaseNameController;
use daily\model\base\BaseNameModel\BaseNameModel;
use daily\model\SportCategoryModel\SportCategoryModel;
use daily\model\SportRecordModel\SportRecordModel;
use JetBrains\PhpStorm\Pure;

class SportCategoryController extends BaseNameController
{
    private BaseNameModel $model;

    protected function model(): BaseNameModel
    {
        if (empty($this->model)) {
            $this->model = new SportCategoryModel();
        }
        return $this->model;
    }

    #[Pure] protected function referenceModels(): array
    {
        $model = new SportRecordModel();
        return [[$model, $model->categoryId()]];
    }
}