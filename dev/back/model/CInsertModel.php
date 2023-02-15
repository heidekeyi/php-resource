<?php

namespace model\CInsertModel;

use CDB\CDB;
use CResult\CResult;
use field\IField\IField;
use model\validator\CUniqueModelValidator\CUniqueModelValidator;

class CInsertModel
{
    public function __construct(array $data)
    {
        $this->CDB = new CDB();
        $this->result = new CResult('');
        $this->data = $data;
    }

    public function unique(IField $field, array $fields): CInsertModel
    {
        $map = [];
        foreach ($fields as $it) {
            $map[$it] = $this->data[$it];
        }
        $this->result = (new CUniqueModelValidator())->uniques($field->table(true), $map);
        return $this;
    }

    public function insert(IField $field): CResult
    {
        if (!$this->result->getStatus()) {
            return $this->result;
        }
        $data = $this->data;
        $data[$field->createTime(true)] = time();
        $fields = array_keys($data);
        $sql = implode(' ', [
            'insert',
            'into',
            $field->table(true),
            '(' . implode(',', $fields) . ')',
            'values',
            '(' . implode(',', explode(' ', trim(str_repeat(' ?', count($fields))))) . ')'
        ]);
        $this->result = $this->CDB->insert($sql, array_values($data));
        if ($this->result->getStatus()) {
            $this->result->setMessage('insert success');
        }
        return $this->result;
    }

    private CDB $CDB;
    readonly private array $data;
    private CResult $result;
}