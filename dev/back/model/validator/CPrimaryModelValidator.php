<?php

namespace model\validator\CPrimaryModelValidator;

use CResult\CResult;
use field\IField\IField;
use model\validator\CUniqueModelValidator\CUniqueModelValidator;

class CPrimaryModelValidator
{
    public function field(string $table, string $field, string $value): CResult
    {
        $result = (new CUniqueModelValidator())->unique($table, $field, $value);
        if ($result->getStatus()) {
            $result->error($field . '=' . $value . ' is not exist');
        } else {
            $result->setStatus(true)->setMessage('')->setData([]);
        }
        return $result;
    }

    public function id(IField $field, string $value): CResult
    {
        return $this->field($field->table(true), $field->id(true), $value);
    }
}