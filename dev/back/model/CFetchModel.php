<?php

namespace model\CFetchModel;

use CDB\CDB;
use CResult\CResult;

class CFetchModel
{
    public function __construct()
    {
        $this->CDB = new CDB();
    }

    public function equal(string $table, array $map): CResult
    {
        $fields = array_keys($map);
        $sql = implode(' ', [
            'select',
            $fields[0],
            'from',
            $table,
            'where',
            implode(' = ? and ', $fields) . ' = ?'
        ]);
        $values = array_values($map);
        return $this->CDB->select($sql, $values);
    }

    private CDB $CDB;
}