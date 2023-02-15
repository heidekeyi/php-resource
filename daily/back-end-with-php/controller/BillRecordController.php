<?php

namespace daily\controller\BillRecordController;

use daily\controller\base\BaseAmountAndDateController\BaseAmountAndDateController;
use daily\model\BillCategoryModel\BillCategoryModel;
use daily\model\BillRecordModel\BillRecordModel;

class BillRecordController extends BaseAmountAndDateController
{
    private BillRecordModel $model;
    private BillCategoryModel $categoryModel;
    private array $form = [];

    protected function model(): BillRecordModel
    {
        if (empty($this->model)) {
            $this->model = new BillRecordModel();
        }
        return $this->model;
    }

    protected function categoryModel(): BillCategoryModel
    {
        if (empty($this->categoryModel)) {
            $this->categoryModel = new BillCategoryModel();
        }
        return $this->categoryModel;
    }

    protected function form(): array
    {
        if (empty($this->form)) {
            $model = $this->model();
            $result = $this->params()
                ->init($model->paramAmount(), '')
                ->existValidate()
                ->emptyValidate()
                ->intValidate()
                ->minValueValidate()
                ->maxValueValidate()
                ->pass()
                ->init($model->paramCategoryId(), '')
                ->existValidate()
                ->emptyValidate()
                ->intValidate()
                ->minValueValidate(1)
                ->maxValueValidate()
                ->pass()
                ->init($model->paramDate(), '')
                ->existValidate()
                ->emptyValidate()
                ->dateValidate()
                ->pass()
                ->result();
            $timezone = $this->params()->timezone();
            $date = $result[$model->paramDate()];
            $date = (+$date + $timezone) . '';
            $this->form = [
                $model->date() => $date,
                $model->categoryId() => $result[$model->paramCategoryId()],
                $model->amount() => $result[$model->paramAmount()],
            ];
        }
        return $this->form;
    }

    protected function foreignModels(): array
    {
        $model = $this->model();
        $category = $this->categoryModel();
        return [
            [$category, $model->categoryId(), []]
        ];
    }

    protected function field(): string
    {
        $model = $this->model();
        $field = [
            $model->id() . ' as ' . $model->paramId(),
            $model->createTime() . ' as ' . $model->paramCreateTime(),
            $model->amount() . ' as ' . $model->paramAmount(),
            $model->date() . ' as ' . $model->paramDate(),
            'c.' . $model->paramCategoryId(),
            'c.' . $model->paramCategoryName(),
        ];
        return join(',', $field);
    }

    protected function initQuery(): array
    {
        $query = $this->queryDate([], []);
        $query = $this->queryCategoryName(...$query);
        return $this->composeQuery($query);
    }
}