<?php

namespace daily\controller\SportRecordController;

use daily\controller\base\BaseAmountAndDateController\BaseAmountAndDateController;
use daily\controller\base\SportRecord\SportRecord;
use daily\model\SportCategoryModel\SportCategoryModel;
use daily\model\SportRecordModel\SportRecordModel;
use daily\model\UnitModel\UnitModel;
use JetBrains\PhpStorm\Pure;


class SportRecordController extends BaseAmountAndDateController
{
    use SportRecord;

    private array $form = [];
    private SportRecordModel $model;
    private UnitModel $unitModel;
    private SportCategoryModel $categoryModel;

    protected function model(): SportRecordModel
    {
        if (empty($this->model)) {
            $this->model = new SportRecordModel();
        }
        return $this->model;
    }

    protected function unitModel(): UnitModel
    {
        if (empty($this->unitModel)) {
            $this->unitModel = new UnitModel();
        }
        return $this->unitModel;
    }

    protected function categoryModel(): SportCategoryModel
    {
        if (empty($this->categoryModel)) {
            $this->categoryModel = new SportCategoryModel();
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
                ->minValueValidate(1)
                ->maxValueValidate()
                ->pass()
                ->init($model->paramCategoryId(), '')
                ->existValidate()
                ->emptyValidate()
                ->intValidate()
                ->minValueValidate(1)
                ->maxValueValidate()
                ->pass()
                ->init($model->paramUnitId(), '')
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
                $model->unitId() => $result[$model->paramUnitId()],
                $model->categoryId() => $result[$model->paramCategoryId()],
                $model->amount() => $result[$model->paramAmount()],
            ];
        }
        return $this->form;
    }

    protected function foreignModels(): array
    {
        $model = $this->model();
        $unit = $this->unitModel();
        $category = $this->categoryModel();
        return [
            [$unit, $model->unitId(), []],
            [$category, $model->categoryId(), []]
        ];
    }

    #[Pure] protected function field(): string
    {
        return $this->initField($this->model);
    }

    private function sqlUnit(): string
    {
        return $this->initSqlUnit(
          $this->model(),
          $this->unitModel(),
          $this->nameModel()
        );
    }

    protected function fetch(string $field, array $where, array $values): array
    {
        $model = $this->model();
        $sql = [
            'select',
            $field,
            'from',
            $model->table(),
            'left join',
            '(' . $this->sqlUnit() . ')' . ' as u',
            'on',
            $model->unitId() . '=u.' . $model->paramUnitId(),
            'left join',
            '(' . $this->sqlCategory() . ')' . ' as c',
            'on',
            $model->categoryId() . '=c.' . $model->paramCategoryId(),
            ...$where
        ];
        $sql = join(' ', $sql);
        return $this->db()->select($sql, $values);
    }

    protected function initQuery(): array
    {
        $query = $this->queryDate([], []);
        $query = $this->queryUnitName(...$query);
        $query = $this->queryCategoryName(...$query);
        return $this->composeQuery($query);
    }

    private function queryUnitName(array $where, array $values): array
    {
        $field = $this->model()->paramUnitName();
        $unit = $this->initLike($field);
        if ($unit !== '') {
            if (!empty($where)) {
                $where[] = 'and';
            }
            $where = [...$where, 'u.' . $field, 'like ?'];
            $values[] = $unit;
        }
        return [$where, $values];
    }
}