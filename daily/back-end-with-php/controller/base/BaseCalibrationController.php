<?php

namespace daily\controller\base\BaseCalibrationController;

use daily\controller\base\Controller\Controller;
use daily\model\base\BaseModel\BaseModel;
use daily\model\NameModel\NameModel;
use daily\model\TimeRecordModel\TimeRecordModel;
use daily\utils\ResponseUtil\ResponseUtil;
use daily\utils\TimeUtil\TimeUtil;
use JetBrains\PhpStorm\NoReturn;

abstract class BaseCalibrationController
{

    abstract protected function model(): BaseModel;

    abstract protected function fieldBeginTime(): string;

    abstract protected function fieldEndTime(): string;

    abstract protected function fetch(): array;

    static protected int $size = 9999;

    use Controller;
    use ResponseUtil;

    protected int $beginTime = 0;
    protected int $endTime = 0;
    protected int $timezone = 0;
    private NameModel $nameModel;

    protected function nameModel(): NameModel
    {
        if (empty($this->nameModel)) {
            $this->nameModel = new NameModel();
        }
        return $this->nameModel;
    }

    private function value(string $field): string
    {
        return $this->params()
            ->init($field, '')
            ->pass()
            ->result()[$field];
    }

    #[NoReturn] public function select()
    {
        $this->timezone = $this->params()->timezone();
        $timeRecordModel = new TimeRecordModel();
        $this->beginTime = $this->valueQuery($timeRecordModel->paramBeginTime());
        $this->endTime = $this->valueQuery($timeRecordModel->paramEndTime());
        $this->fixTime();
        $this->responseSuccess('select success', $this->fetch());
    }

    private function valueQuery(string $field): int
    {
        $value = $this->value($field);
        if ($value === '') {
            return 0;
        }
        if (!preg_match('/^\d{4}(-\d{1,2}){0,2}$/', $value)) {
            $this->responseError($field . '=' . $value . ' is not match date format');
        }
        return +(new TimeUtil())->timestamp($field, $value) + $this->timezone;
    }

    private function beginTime(): int
    {
        $field = $this->fieldBeginTime();
        $model = $this->model();
        $sql = [
            'select * from',
            $model->table(),
            'order by',
            $field,
            'asc',
            'limit 0, 1'
        ];
        $sql = join(' ', $sql);
        $result = $this->db()->select($sql, []);
        return empty($result) ? 0 : +$result[0][$field];
    }

    private function endTime(): int
    {
        $field = $this->fieldEndTime();
        $model = $this->model();
        $sql = [
            'select * from',
            $model->table(),
            'order by',
            $field,
            'desc',
            'limit 0, 1'
        ];
        $sql = join(' ', $sql);
        $result = $this->db()->select($sql, []);
        return empty($result) ? 0 : +$result[0][$field];
    }

    private function fixTime()
    {
        $beg = $this->beginTime;
        $end = $this->endTime;
        if ($beg && $end && $beg > $end) {
            $this->responseError('beginTime > endTime make no sense');
        }
        $beginTime = $this->beginTime();
        if ($beg) {
            $beg = max($beg, $beginTime);
        } else {
            $beg = $beginTime;
        }
        $this->beginTime = $beg;
        $endTime = $this->endTime();
        if ($end) {
            $end = min($end, $endTime);
        } else {
            $end = $endTime;
        }
        $this->endTime = $end;
    }
}