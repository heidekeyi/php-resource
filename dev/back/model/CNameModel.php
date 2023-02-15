<?php

namespace model\CNameModel;

use CDB\CDB;
use CResult\CResult;
use field\CNameField\CNameField;
use model\CInsertModel\CInsertModel;
use model\validator\CPrimaryModelValidator\CPrimaryModelValidator;

class CNameModel
{
    public function __construct()
    {
        $this->field = new CNameField();
    }

    public function insert(array $data): CResult
    {
        $field = $this->field();
        $data = [$field->name(true) => time() . ''];
        return (new CInsertModel($data))
            ->unique($field, [$field->name(true)])
            ->insert($field);
    }

    public function select(string $id): CResult
    {
        $field = $this->field();
        $result = (new CPrimaryModelValidator())->id($field, $id);
        if (!$result->getStatus()) {
            return $result;
        }
        $sql = implode(' ', [
            'select',
            implode(',', [
                $field->id(true) . ' as ' . $field->id(false),
                $field->createTime(true) . ' as ' . $field->createTime(false),
                $field->name(true) . ' as ' . $field->name(false),
            ]),
            'from',
            $field->table(true),
            'where',
            $field->id(true),
            '=',
            '?'
        ]);
        return (new CDB())->select($sql, [$id]);
    }

    public function field(): CNameField
    {
        return $this->field;
    }

    private CNameField $field;
}