<?php

namespace daily\validator\ReferenceValidator;

use daily\utils\ResponseUtil\ResponseUtil;
use daily\validator\BaseValidator\BaseValidator;

class ReferenceValidator extends BaseValidator
{
    use ResponseUtil;

    private string $field = '';

    public function field(string $field): static
    {
        $this->field = $field;
        return $this;
    }

    public function validate(): static
    {
        $model = $this->model;
        $sql = [
            'select * from',
            $model->table(),
            'where',
            $this->field,
            '=?'
        ];
        $sql = join(' ', $sql);
        $result = $this->db()->select($sql, [$this->id]);
        if (!empty($result)) {
            $message = [
                $this->fieldName($this->field),
                '=',
                $this->id,
                'has references in',
                $model->table()
            ];
            $message = join(' ', $message);
            $this->responseError($message);
        }
        return $this;
    }
}