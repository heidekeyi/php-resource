<?php

namespace daily\controller\TimeCategoryController;

use daily\controller\base\BaseParentController\BaseParentController;
use daily\model\base\BaseParentModel\BaseParentModel;
use daily\model\TimeCategoryModel\TimeCategoryModel;
use daily\model\TimeRecordModel\TimeRecordModel;

class TimeCategoryController extends BaseParentController
{
    private BaseParentModel $model;

    protected function model(): BaseParentModel
    {
        if (empty($this->model)) {
            $this->model = new TimeCategoryModel();
        }
        return $this->model;
    }

    protected function referenceModels(): array
    {
        $parent = new TimeRecordModel();
        $model = $this->model();
        return [
            [$parent, $parent->categoryId()],
            [$model, $model->parentId()]
        ];
    }
}