<?php

namespace daily\controller\base\BaseTimeCalibrationController;

use daily\controller\base\BaseCalibrationController\BaseCalibrationController;
use daily\model\base\BaseParentModel\BaseParentModel;
use daily\model\TimeCategoryModel\TimeCategoryModel;
use daily\model\TimeRecordModel\TimeRecordModel;

abstract class BaseTimeCalibrationController extends BaseCalibrationController
{
    private TimeRecordModel $model;
    private TimeCategoryModel $categoryModel;

    protected function model(): TimeRecordModel
    {
        if (empty($this->model)) {
            $this->model = new TimeRecordModel();
        }
        return $this->model;
    }

    protected function categoryModel(): BaseParentModel
    {
        if (empty($this->categoryModel)) {
            $this->categoryModel = new TimeCategoryModel();
        }
        return $this->categoryModel;
    }

    protected function fieldBeginTime(): string
    {
        return $this->model()->beginTime();
    }

    protected function fieldEndTime(): string
    {
        return $this->model()->endTime();
    }

    protected function fetchAmount(): array
    {
        $model = $this->model();
        $field = [
            'sum(' . $model->endTime() . ' - ' . $model->beginTime() . ') as amount',
            $model->categoryId() . ' as ' . $model->paramId(),
        ];
        $sql = [
            'select',
            join(',', $field),
            'from',
            $model->table(),
            'where',
            $model->beginTime(),
            '>=?',
            'and',
            $model->beginTime(),
            '<?',
            'group by',
            $model->categoryId(),
            'order by',
            $model->categoryId(),
            'desc'
        ];
        return $this->db()->select(join(' ', $sql), [$this->beginTime, $this->endTime]);
    }

    protected function fetchCategory(): array
    {
        $categoryModel = $this->categoryModel();
        $nameModel = $this->nameModel();
        $field = [
            $categoryModel->id() . ' as id',
            $categoryModel->parentId() . ' as pid',
            $nameModel->name() . ' as name',
            '0 as amount'
        ];
        $sql = [
            'select',
            join(',', $field),
            'from',
            $categoryModel->table(),
            'left join',
            $nameModel->table(),
            'on',
            $nameModel->id() . ' = ' . $categoryModel->nameId(),
            'order by',
            $categoryModel->id(),
            'desc'
        ];
        $sql = join(' ', $sql);
        $result = [];
        foreach ($this->db()->select($sql, []) as $item) {
            $id = $item['id'];
            $result[$id] = $item;
        }
        return $result;
    }

    protected function amount(): array
    {
        $category = $this->fetchCategory();
        $model = $this->model();
        $field = 'amount';
        foreach ($this->fetchAmount() as $item) {
            $id = $item[$model->paramId()];
            $category[$id][$field] = $item[$field];
        }
        foreach ($category as $item) {
            $pid = $item['pid'];
            $amount = +$item[$field];
            while ($pid !== '0') {
                $it = $category[$pid];
                $category[$pid][$field] = $amount + +$it[$field];
                $pid = $it['pid'];
            }
        }
        $result = [];
        foreach ($category as $item) {
            $amount = $item[$field];
            if (+$amount === 0) {
                continue;
            }
            $item[$field] = $amount . '';
            $result[] = $item;
        }
        return $result;
    }
}