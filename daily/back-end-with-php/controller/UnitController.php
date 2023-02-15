<?php

namespace daily\controller\UnitController;

use daily\controller\base\BaseNameController\BaseNameController;
use daily\model\base\BaseNameModel\BaseNameModel;
use daily\model\SportRecordModel\SportRecordModel;
use daily\model\UnitModel\UnitModel;
use JetBrains\PhpStorm\Pure;

class UnitController extends BaseNameController
{
    private BaseNameModel $model;

    protected function model(): BaseNameModel
    {
        if (empty($this->model)) {
            $this->model = new UnitModel();
        }
        return $this->model;
    }

    #[Pure] protected function referenceModels(): array
    {
        $model = new SportRecordModel();
        return [[$model, $model->unitId()]];
    }
}