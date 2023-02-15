<?php

namespace daily\reduction\NameReduction;

use daily\model\base\BaseNameModel\BaseNameModel;
use daily\model\BillCategoryModel\BillCategoryModel;
use daily\model\NameModel\NameModel;
use daily\model\SportCategoryModel\SportCategoryModel;
use daily\model\TimeCategoryModel\TimeCategoryModel;
use daily\model\UnitModel\UnitModel;
use daily\reduction\BaseReduction\BaseReduction;


class NameReduction extends BaseReduction
{
    public function calibration()
    {
        $model = [
            UnitModel::class,
            SportCategoryModel::class,
            BillCategoryModel::class,
            TimeCategoryModel::class
        ];
        $ids = [];
        foreach ($model as $item) {
            foreach ($this->ids(new $item) as $it) {
                $ids[$it] = $it;
            }
        }
        $model = new NameModel();
        if (empty($ids)) {
            $result = $this->all($model);
        } else {
            $result = $this->select($model, array_values($ids));
        }
        $this->message($model, $result);
    }

    private function ids(BaseNameModel $model): array
    {
        $field = $model->nameId();
        $sql = $this->idsSql($model, $field);
        $res = [];
        foreach ($this->db()->select($sql, static::$values) as $item) {
            $value = $item[$field];
            $res[$value] = $value;
        }
        return array_values($res);
    }
}