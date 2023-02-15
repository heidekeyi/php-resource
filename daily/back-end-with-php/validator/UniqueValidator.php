<?php

namespace daily\validator\UniqueValidator;

use daily\utils\ResponseUtil\ResponseUtil;
use daily\validator\BaseValidator\BaseValidator;

class UniqueValidator extends BaseValidator
{
    use ResponseUtil;

    private array $uniques = [];

    public function uniques(array $uniques): static
    {
        $this->uniques = $uniques;
        return $this;
    }

    private function validateUnique(array $unique)
    {
        $message = [];
        $values = [];
        $sql = [];
        foreach ($unique as $key => $value) {
            $message[] = $this->fieldName($key) . ' = ' . $value;
            $values[] = $value;
            $sql[] = $key . '=?';
        }
        $sql = join(' and ', $sql);
        $sql = [
            'select * from',
            $this->model->table(),
            'where',
            $sql
        ];
        $sql = join(' ', $sql);
        $result = $this->db()->select($sql, $values);
        if (!empty($result) && $result[0][$this->model->id()] !== $this->id) {
            $message = join(' && ', $message);
            $message = [$this->model->table() . ':', $message, 'is exist'];
            $message = join(' ', $message);
            $this->responseError($message);
        }
    }

    public function validate(): static
    {
        foreach ($this->uniques as $unique) {
            $this->validateUnique($unique);
        }
        return $this;
    }
}