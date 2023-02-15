<?php

namespace daily\controller\NameController;

use daily\controller\base\BaseQueryNameController\BaseQueryNameController;
use daily\model\BillCategoryModel\BillCategoryModel;
use daily\model\NameModel\NameModel;
use daily\model\SportCategoryModel\SportCategoryModel;
use daily\model\TimeCategoryModel\TimeCategoryModel;
use daily\model\UnitModel\UnitModel;
use JetBrains\PhpStorm\Pure;

class NameController extends BaseQueryNameController
{
    private array $form = [];

    protected function model(): NameModel
    {
        return $this->nameModel();
    }

    protected function form(): array
    {
        if (empty($this->form)) {
            $model = $this->model();
            $form = $this->params()
                ->init($model->paramName(), '')
                ->existValidate()
                ->emptyValidate()
                ->minLengthValidate(1)
                ->maxLengthValidate(32)
                ->pass()
                ->result();
            $this->form = [$model->name() => $form[$model->paramName()]];
        }
        return $this->form;
    }

    protected function foreignModels(): array
    {
        return [];
    }

    #[Pure] protected function referenceModels(): array
    {
        $list = [];
        $model = new UnitModel();
        $list[] = [$model, $model->nameId()];
        $model = new SportCategoryModel();
        $list[] = [$model, $model->nameId()];
        $model = new BillCategoryModel();
        $list[] = [$model, $model->nameId()];
        $model = new TimeCategoryModel();
        $list[] = [$model, $model->nameId()];
        return $list;
    }

    protected function uniqueKeys(): array
    {
        return [$this->form()];
    }

    protected function field(): string
    {
        $model = $this->model();
        $field = [
            $model->id() . ' as ' . $model->paramId(),
            $model->name() . ' as ' . $model->paramName(),
            $model->createTime() . ' as ' . $model->paramCreateTime()
        ];
        return join(",", $field);
    }

    protected function fetch(string $field, array $where, array $values): array
    {
        $model = $this->model();
        $sql = [
            'select',
            $field,
            'from',
            $model->table(),
            ...$where
        ];
        $sql = join(' ', $sql);
        return $this->db()->select($sql, $values);
    }

    protected function initQuery(): array
    {
        return $this->composeQuery($this->queryName([], []));
    }
}