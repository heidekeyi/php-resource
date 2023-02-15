<?php

namespace daily\reduction\TimeReduction;

use daily\model\TimeCategoryModel\TimeCategoryModel;
use daily\model\TimeRecordModel\TimeRecordModel;
use daily\reduction\BaseParentReduction\BaseParentReduction;

class TimeReduction extends BaseParentReduction
{

    public function calibration()
    {
        $model = new TimeRecordModel();
        $this->impl($model, new TimeCategoryModel(), $model->categoryId());
    }
}