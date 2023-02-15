<?php

namespace daily\controller\base\BaseBillCalibrationController;

use daily\controller\base\BaseCalibrationController\BaseCalibrationController;
use daily\model\base\BaseParentModel\BaseParentModel;
use daily\model\BillCategoryModel\BillCategoryModel;
use daily\model\BillRecordModel\BillRecordModel;

abstract class BaseBillCalibrationController extends BaseCalibrationController
{
    private BaseParentModel $categoryModel;
    private BillRecordModel $model;

    protected function categoryModel(): BaseParentModel
    {
        if (empty($this->categoryModel)) {
            $this->categoryModel = new BillCategoryModel();
        }
        return $this->categoryModel;
    }

    protected function model(): BillRecordModel
    {
        if (empty($this->model)) {
            $this->model = new BillRecordModel();
        }
        return $this->model;
    }

    protected function fieldBeginTime(): string
    {
        return $this->date();
    }

    protected function fieldEndTime(): string
    {
        return $this->date();
    }

    private function date(): string
    {
        return $this->model()->date();
    }
}