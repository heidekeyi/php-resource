<?php

namespace daily\validator\IdValidator;

use daily\utils\ResponseUtil\ResponseUtil;
use daily\validator\BaseValidator\BaseValidator;
use JetBrains\PhpStorm\Pure;


class IdValidator extends BaseValidator
{
    use ResponseUtil;

    public function validate(): static
    {
        if (empty($this->queryId())) {
            $this->responseError($this->errorMessage());
        }
        return $this;
    }

    #[Pure] protected function errorMessage(): string
    {
        $model = $this->model;
        $message = [
            $model->table() . ':',
            $model->paramId(),
            '=',
            $this->id,
            'is not exist'
        ];
        return join(' ', $message);
    }

    protected function queryId(): array
    {
        $model = $this->model;
        $sql = [
            'select * from',
            $model->table(),
            'where',
            $model->id(),
            '=?'
        ];
        $sql = join(' ', $sql);
        return $this->db()->select($sql, [$this->id]);
    }
}