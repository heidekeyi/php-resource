<?php

namespace daily\validator\BaseValidator;

use daily\model\base\BaseModel\BaseModel;
use daily\utils\DbUtil\DbUtil;

abstract class BaseValidator
{
    abstract public function validate();

    protected BaseModel $model;
    protected string $id = '';

    public function id(string $id): static
    {
        $this->id = $id;
        return $this;
    }

    public function model(BaseModel $model): static
    {
        $this->model = $model;
        return $this;
    }

    protected function db(): DbUtil
    {
        return new DbUtil();
    }

    protected function fieldName(string $field): string
    {
        $list = explode($this->model->needle(), $field);
        return array_pop($list) ?? '';
    }
}