<?php

namespace daily\controller\BillAssetsController;

use daily\controller\base\BaseBillCalibrationController\BaseBillCalibrationController;

class BillAssetsController extends BaseBillCalibrationController
{
    private function fetchAll(): array
    {
        $model = $this->model();
        $field = [
            'sum(' . $model->amount() . ') as ' . $model->paramAmount(),
            $model->date() . ' as ' . $model->paramId(),
        ];
        $sql = [
            'select',
            join(',', $field),
            'from',
            $model->table(),
            'where',
            $model->date(),
            '>=?',
            'and',
            $model->date(),
            '<=?',
            'group by',
            $model->date(),
            'order by',
            $model->date(),
            'asc'
        ];
        return $this->db()->select(join(' ', $sql), [$this->beginTime, $this->endTime]);
    }

    private function fetchAmount(): string
    {
        $model = $this->model();
        $amount = $model->paramAmount();
        $sql = [
            'select',
            'sum(' . $model->amount() . ') as ' . $amount,
            'from',
            $model->table(),
            'where',
            $model->date(),
            '<?',
        ];
        $sql = join(' ', $sql);
        $value = $this->db()->select($sql, [$this->beginTime])[0][$amount];
        if ($value === null) {
            $value = '0';
        }
        return $value;
    }

    protected function fetch(): array
    {
        $amount = +$this->fetchAmount();
        $result = [];
        $field = $this->model()->paramAmount();
        foreach ($this->fetchAll() as $item) {
            $value = $item[$field];
            $value = +$value + $amount;
            $item[$field] = $value . '';
            $amount = $value;
            $result[] = $item;
        }
        return $result;
    }
}