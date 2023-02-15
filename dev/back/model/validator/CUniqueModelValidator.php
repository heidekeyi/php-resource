<?php

namespace model\validator\CUniqueModelValidator;

use CResult\CResult;
use model\CFetchModel\CFetchModel;

class CUniqueModelValidator
{
    public function unique(string $table, string $field, string $value): CResult
    {
        return $this->uniques($table, [$field => $value]);
    }

    public function uniques(string $table, array $map): CResult
    {
        $result = (new CFetchModel())->equal($table, $map);
        if (!$result->getStatus()) {
            return $result;
        }
        if (!empty($result->getData())) {
            $result->error(__FUNCTION__ . ': ' . json_encode($map))->setData('');
        }
        return $result->setData([]);
    }
}