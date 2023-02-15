<?php

namespace daily\controller\TimeCalibrationController;

use daily\controller\base\BaseTimeCalibrationController\BaseTimeCalibrationController;

class TimeCalibrationController extends BaseTimeCalibrationController
{
    protected function fetch(): array
    {
        $model = $this->model();
        $beginTime = $this->beginTime;
        $endTime = $this->endTime;
        $sql = [
            'select * from',
            $model->table(),
            'where',
            $model->beginTime(),
            '>=?',
            'and',
            $model->beginTime(),
            '<?',
            'order by',
            $model->beginTime(),
            'asc'
        ];
        $sql = join(' ', $sql);
        $dateSecond = 24 * 60 * 60;
        $beg = $beginTime;
        $result = [];
        if ($beginTime === $endTime) {
            $endTime += $dateSecond;
        }
        $tmpDate = -1;
        $tmpList = [];
        $tmpCount = -1;
        while (true) {
            $end = $beg + static::$size * $dateSecond;
            $list = $this->db()->select($sql, [$beg, min($end, $endTime)]);
            foreach ($list as $item) {
                $date = $item[$model->beginTime()];
                $count = floor(($date - $this->timezone) / $dateSecond);
                if ($tmpCount < 0) {
                    $tmpDate = $date;
                    $tmpCount = $count;
                    $tmpList[] = $item;
                    continue;
                }
                if ($count === $tmpCount) {
                    $tmpDate = $date;
                    $tmpList[] = $item;
                    continue;
                }
                $sum = $this->sum($tmpList);
                if ($sum !== $dateSecond) {
                    $result[] = [
                        'second' => $sum,
                        'date' => $tmpDate,
                    ];
                }
                $tmpDate = $date;
                $tmpCount = $count;
                $tmpList = [$item];
            }
            $beg = $end;
            if ($end >= $endTime) {
                if (!empty($tmpList)) {
                    $sum = $this->sum($tmpList);
                    if ($sum !== $dateSecond) {
                        $result[] = [
                            'second' => $sum,
                            'date' => $tmpDate,
                        ];
                    }
                }
                break;
            }
        }
        return $result;
    }

    private function sum(array $list): int
    {
        $model = $this->model();
        $fieldBeg = $model->beginTime();
        $fieldEnd = $model->endTime();
        $sum = 0;
        foreach ($list as $item) {
            $valBeg = $item[$fieldBeg];
            $valEnd = $item[$fieldEnd];
            $sum += $valEnd - $valBeg;
        }
        return $sum;
    }
}