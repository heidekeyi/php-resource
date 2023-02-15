<?php

namespace daily\reduction\BaseReduction;

use daily\model\base\BaseModel\BaseModel;
use daily\utils\DbUtil\DbUtil;
use JetBrains\PhpStorm\Pure;

abstract class BaseReduction
{
    abstract public function calibration();

    static protected array $values = [1657973467];

    protected function db(): DbUtil
    {
        return new DbUtil();
    }

    private function inJoin(array $ids): string
    {
        $res = [];
        foreach ($ids as $_) {
            $res[] = '?';
        }
        return '(' . join(',', $res) . ')';
    }

    protected function select(BaseModel $model, array $ids): array
    {
        $sql = [
            'select * from',
            $model->table(),
            'where',
            $model->id(),
            'not in',
            $this->inJoin($ids)
        ];
        $sql = join(' ', $sql);
        return $this->db()->select($sql, $ids);
    }

    #[Pure] protected function idsSql(BaseModel $model, string $field): string
    {
        $sql = [
            'select',
            $field,
            'from',
            $model->table(),
            'where',
            $model->createTime(),
            '>?',
            'group by',
            $field
        ];
        return join(' ', $sql);
    }

    protected function message(BaseModel $model, array $result)
    {
        if (!empty($result)) {
            echo static::class . ': ';
            $field = $model->id();
            foreach ($result as $it) {
                echo $it[$field] . ' ';
            }
            echo PHP_EOL;
        }
    }

    protected function all(BaseModel $model): array
    {
        $sql = [
            'select * from',
            $model->table(),
            'where',
            $model->createTime(),
            '>?',
        ];
        $sql = join(' ', $sql);
        return $this->db()->select($sql, static::$values);
    }
}