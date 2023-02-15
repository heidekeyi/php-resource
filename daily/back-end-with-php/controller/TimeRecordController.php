<?php

namespace daily\controller\TimeRecordController;

use daily\controller\base\BaseCategoryController\BaseCategoryController;
use daily\model\TimeCategoryModel\TimeCategoryModel;
use daily\model\TimeRecordModel\TimeRecordModel;
use daily\utils\ResponseUtil\ResponseUtil;

class TimeRecordController extends BaseCategoryController
{
    use ResponseUtil;

    private TimeRecordModel $model;
    private TimeCategoryModel $categoryModel;
    private array $form = [];

    protected function model(): TimeRecordModel
    {
        if (empty($this->model)) {
            $this->model = new TimeRecordModel();
        }
        return $this->model;
    }

    protected function categoryModel(): TimeCategoryModel
    {
        if (empty($this->categoryModel)) {
            $this->categoryModel = new TimeCategoryModel();
        }
        return $this->categoryModel;
    }

    protected function uniqueKeys(): array
    {
        return [];
    }

    protected function foreignModels(): array
    {
        $model = $this->model();
        $category = $this->categoryModel();
        return [
            [$category, $model->categoryId(), []]
        ];
    }

    protected function form(): array
    {
        if (empty($this->form)) {
            $model = $this->model();
            $result = $this->params()
                ->init($model->paramCategoryId(), '')
                ->existValidate()
                ->emptyValidate()
                ->intValidate()
                ->minValueValidate(1)
                ->maxValueValidate()
                ->pass()
                ->init($model->paramBeginTime(), '')
                ->existValidate()
                ->emptyValidate()
                ->timeValidate()
                ->pass()
                ->init($model->paramEndTime(), '')
                ->existValidate()
                ->emptyValidate()
                ->timeValidate()
                ->pass()
                ->result();
            $this->form = [
                $model->categoryId() => $result[$model->paramCategoryId()],
                $model->beginTime() => $result[$model->paramBeginTime()],
                $model->endTime() => $result[$model->paramEndTime()],
            ];
        }
        return $this->form;
    }

    protected function field(): string
    {
        $model = $this->model();
        $field = [
            $model->id() . ' as ' . $model->paramId(),
            $model->createTime() . ' as ' . $model->paramCreateTime(),
            $model->beginTime() . ' as ' . $model->paramBeginTime(),
            $model->endTime() . ' as ' . $model->paramEndTime(),
            'c.' . $model->paramCategoryId(),
            'c.' . $model->paramCategoryName(),
        ];
        return join(',', $field);
    }

    protected function initQuery(): array
    {
        $query = [[], []];
        $query = $this->queryDate(...$query);
        $query = $this->queryCategoryName(...$query);
        return $this->composeQuery($query);
    }


    private function queryDate(array $where, array $values): array
    {
        $model = $this->model();
        $field = $model->beginTime();
        list ($w, $v) = $this->categoryDate('date', $field, $field);
        $where = [...$where, ...$w];
        $values = [...$values, ...$v];
        return [$where, $values];
    }

    protected function customValidate(string $id)
    {
        $this->validateDate();
        $model = $this->model();
        $fieldBegin = $model->beginTime();
        $fieldEnd = $model->endTime();
        $form = $this->form();
        $valueBegin = +$form[$fieldBegin];
        $valueEnd = +$form[$fieldEnd];
        $model = $this->model();
        $where = [
            '(', $fieldBegin, '>?', 'and', $fieldBegin, '<?', ')',
            'or', '(', $fieldEnd, '>?', 'and', $fieldEnd, '<?', ')',
            'or', '(', $fieldBegin, '<=?', 'and', $fieldEnd, '>=?', ')',
        ];
        $values = [
            $valueBegin, $valueEnd,
            $valueBegin, $valueEnd,
            $valueBegin, $valueEnd
        ];
        if ($id !== '') {
            $where = ['(', ...$where, ')', 'and', $model->id(), '<>?'];
            $values[] = $id;
        }
        $sql = [
            'select * from', $model->table(),
            'where', ...$where
        ];
        $sql = join(' ', $sql);
        $result = $this->db()->select($sql, $values);
        if (!empty($result)) {
            $this->responseError('beginTime and endTime have coincidence region make no sense');
        }
    }

    private function validateDate()
    {
        $form = $this->form();
        $model = $this->model();
        $beginTime = $form[$model->beginTime()];
        $endTime = $form[$model->endTime()];
        if ($beginTime >= $endTime) {
            $this->responseError('beginTime >= endTime');
        }
        $date = 24 * 60 * 60;
        if (ceil($endTime / $date) - floor($beginTime / $date) > 1) {
            $this->responseError('beginTime and endTime must be a same day');
        }
        $timezone = $this->params()->timezone();
        $this->form[$model->beginTime()] = (+$beginTime + $timezone) . '';
        $this->form[$model->endTime()] = (+$endTime + $timezone) . '';
    }
}