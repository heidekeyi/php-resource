<?php

namespace daily\controller\SportCalibrationController;

use daily\controller\base\BaseSportCalibrationController\BaseSportCalibrationController;
use daily\controller\base\SportRecord\SportRecord;
use daily\controller\base\Category\Category;

class SportCalibrationController extends BaseSportCalibrationController
{
    use Category;
    use SportRecord;

    private function sql(): string
    {
        $nameModel = $this->nameModel();
        $categoryModel = $this->categoryModel();
        $unitModel = $this->unitModel();
        $model = $this->model();
        $sqlCategory = $this->initSqlCategory($model, $categoryModel, $nameModel);
        $sqlUnit = $this->initSqlUnit($model, $unitModel, $nameModel);
        $sql = [
            'select',
            $this->initField($model),
            'from',
            $model->table(),
            'left join',
            '(' . $sqlUnit . ')' . ' as u',
            'on',
            $model->unitId() . '=u.' . $model->paramUnitId(),
            'left join',
            '(' . $sqlCategory . ')' . ' as c',
            'on',
            $model->categoryId() . '=c.' . $model->paramCategoryId(),
            'where',
            $model->date(),
            '>=?',
            'and',
            $model->date(),
            '<=?',
            'order by',
            join(',', [$model->date() . ' asc ', $model->id() . ' desc'])
        ];
        return join(' ', $sql);
    }

    protected function fetch(): array
    {
        $sql = $this->sql();
        $beginTime = $this->beginTime;
        $endTime = $this->endTime;
        $dateSecond = 24 * 60 * 60;
        $result = [];
        $beg = $beginTime;
        $tmpList = [];
        $tmpDate = -1;
        $fieldDate = $this->model()->paramDate();
        while (true) {
            $end = $beg + $dateSecond + static::$size * $dateSecond;
            $list = $this->db()->select($sql, [$beg, min($endTime, $end)]);
            foreach ($list as $item) {
                $date = $item[$fieldDate];
                if ($tmpDate < 0) {
                    $tmpList[] = $item;
                    $tmpDate = $date;
                    continue;
                }
                if ($date === $tmpDate) {
                    $tmpList[] = $item;
                    continue;
                }
                if (!$this->calibration($tmpList)) {
                    $result = [...$result, ...$tmpList];
                }
                $tmpList = [$item];
                $tmpDate = $date;
            }
            $beg = $end;
            if ($end >= $endTime) {
                if (!empty($tmpList) && !$this->calibration($tmpList)) {
                    $result = [...$result, ...$tmpList];
                }
                break;
            }
        }
        return $result;
    }

    private function calibration(array $list): bool
    {
        $model = $this->model();
        $map = [];
        $fieldUnitId = $model->paramUnitId();
        $fieldCategoryId = $model->paramCategoryId();
        foreach ($list as $item) {
            $categoryId = $item[$fieldCategoryId];
            $it = $map[$categoryId] ?? '';
            if ($it === '') {
                $map[$categoryId] = $item;
                continue;
            }
            if ($item[$fieldUnitId] !== $it[$fieldUnitId]) {
                return false;
            }
        }
        return true;
    }
}