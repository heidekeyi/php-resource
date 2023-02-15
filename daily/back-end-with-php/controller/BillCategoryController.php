<?php

namespace daily\controller\BillCategoryController;

use daily\controller\base\BaseParentController\BaseParentController;
use daily\model\base\BaseParentModel\BaseParentModel;
use daily\model\BillCategoryModel\BillCategoryModel;
use daily\model\BillRecordModel\BillRecordModel;

class BillCategoryController extends BaseParentController
{
    private BaseParentModel $model;

    protected function model(): BaseParentModel
    {
        if (empty($this->model)) {
            $this->model = new BillCategoryModel();
        }
        return $this->model;
    }

    protected function referenceModels(): array
    {
        $parent = new BillRecordModel();
        $model = $this->model();
        return [
            [$parent, $parent->categoryId()],
            [$model, $model->parentId()]
        ];
    }
}