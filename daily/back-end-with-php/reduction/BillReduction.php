<?php

namespace daily\reduction\BillReduction;

use daily\model\BillCategoryModel\BillCategoryModel;
use daily\model\BillRecordModel\BillRecordModel;
use daily\reduction\BaseParentReduction\BaseParentReduction;

class BillReduction extends BaseParentReduction
{
    public function calibration()
    {
        $model = new BillRecordModel();
        $this->impl($model, new BillCategoryModel(), $model->categoryId());
    }
}