<?php

namespace daily\reduction\BaseSportReduction;

use daily\model\base\BaseModel\BaseModel;
use daily\model\SportRecordModel\SportRecordModel;
use daily\reduction\BaseReduction\BaseReduction;

abstract class BaseSportReduction extends BaseReduction
{
    private SportRecordModel $sport;

    protected function impl(BaseModel $model, string $field)
    {
        $ids = array_values($this->ids($field));
        if (empty($ids)) {
            $result = $this->all($model);
        } else {
            $result = $this->select($model, array_values($ids));
        }
        $this->message($model, $result);
    }

    protected function ids(string $field): array
    {
        $sql = $this->idsSql($this->sport(), $field);
        $res = [];
        foreach ($this->db()->select($sql, static::$values) as $item) {
            $value = $item[$field];
            $res[$value] = $value;
        }
        return array_values($res);
    }

    protected function sport(): SportRecordModel
    {
        if (empty($this->sport)) {
            $this->sport = new SportRecordModel();
        }
        return $this->sport;
    }
}