<?php

namespace daily\controller\base\BaseSportCalibrationController;

use daily\controller\base\BaseCalibrationController\BaseCalibrationController;
use daily\model\SportCategoryModel\SportCategoryModel;
use daily\model\SportRecordModel\SportRecordModel;
use daily\model\UnitModel\UnitModel;

abstract class BaseSportCalibrationController extends BaseCalibrationController
{
    private SportRecordModel $model;
    private SportCategoryModel $categoryModel;
    private UnitModel $unitModel;

    protected function model(): SportRecordModel
    {
        if (empty($this->model)) {
            $this->model = new SportRecordModel();
        }
        return $this->model;
    }

    protected function categoryModel(): SportCategoryModel
    {
        if (empty($this->categoryModel)) {
            $this->categoryModel = new SportCategoryModel();
        }
        return $this->categoryModel;
    }

    protected function unitModel(): UnitModel
    {
        if (empty($this->unitModel)) {
            $this->unitModel = new UnitModel();
        }
        return $this->unitModel;
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