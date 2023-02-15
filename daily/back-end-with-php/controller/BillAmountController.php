<?php

namespace daily\controller\BillAmountController;

use daily\controller\base\BaseBillCalibrationController\BaseBillCalibrationController;
use daily\controller\base\Category\Category;
use daily\controller\base\Controller\Controller;
use daily\model\NameModel\NameModel;

class BillAmountController extends BaseBillCalibrationController
{
    use Controller;
    use Category;

    private array $category = [];

    private function initCategory()
    {
        $categoryModel = $this->categoryModel();
        $nameModel = $this->nameModel();
        $field = [
            $nameModel->name() . ' as ' . $categoryModel->name(),
            $categoryModel->id(),
            $categoryModel->parentId(),
        ];
        $sql = [
            'select',
            join(',', $field),
            'from',
            $categoryModel->table(),
            'left join',
            $nameModel->table(),
            'on',
            $categoryModel->nameId() . ' = ' . $nameModel->id(),
            'order by',
            $categoryModel->parentId(),
            'asc'
        ];
        $sql = join(' ', $sql);
        $list = $this->db()->select($sql, []);
        $result = [];
        $model = $this->model();
        foreach ($list as $item) {
            $valueId = $item[$categoryModel->id()];
            $valueParentId = $item[$categoryModel->parentId()];
            $name = $item[$categoryModel->name()];
            if ($valueParentId === '0') {
                $result[$valueId] = [
                    'name' => $name,
                    'id' => $valueId,
                    'enable' => false,
                    $model->amount() => 0,
                ];
                continue;
            }
            while (true) {
                $it = $result[$valueParentId];
                if (is_array($it)) {
                    $result[$valueId] = $valueParentId;
                    break;
                }
                $valueParentId = $it;
            }
        }
        $this->category = $result;
    }

    private function sql(): string
    {
        $model = $this->model();
        $field = [
            'sum(' . $model->amount() . ') as ' . $model->amount(),
            $model->categoryId(),
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
            $model->categoryId(),
            'order by',
            $model->categoryId(),
            'desc'
        ];
        return join(' ', $sql);
    }

    protected function fetch(): array
    {
        $this->initCategory();
        $values = [$this->beginTime, $this->endTime];
        $list = $this->db()->select($this->sql(), $values);
        $model = $this->model();
        foreach ($list as $item) {
            $id = $item[$model->categoryId()];
            $amount = $item[$model->amount()];
            $it = $this->category[$id];
            if (is_string($it)) {
                $id = $it;
            }
            $item = $this->category[$id];
            $item[$model->amount()] += +$amount;
            $item['enable'] = true;
            $this->category[$id] = $item;
        }
        $result = [];
        foreach ($this->category as $item) {
            if (is_string($item)) {
                continue;
            }
            $id = $item['id'];
            $name = $item['name'];
            $enable = $item['enable'];
            $amount = $item[$model->amount()];
            if ($enable) {
                $result[] = [
                    $model->paramAmount() => $amount,
                    'id' => $id,
                    'name' => $name
                ];
            }
        }
        return $result;
    }
}