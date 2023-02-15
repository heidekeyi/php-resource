<?php

namespace daily\controller\base\BaseNameController;

use daily\controller\base\BaseQueryNameController\BaseQueryNameController;
use daily\model\base\BaseNameModel\BaseNameModel;

abstract class BaseNameController extends BaseQueryNameController
{
    abstract protected function model(): BaseNameModel;

    private array $form = [];

    protected function form(): array
    {
        if (empty($this->form)) {
            $model = $this->model();
            $form = $this->params()
                ->init($model->paramNameId(), '')
                ->existValidate()
                ->emptyValidate()
                ->intValidate()
                ->minValueValidate(1)
                ->maxValueValidate()
                ->pass()
                ->result();
            $this->form = [$model->nameId() => $form[$model->paramNameId()]];
        }
        return $this->form;
    }

    protected function uniqueKeys(): array
    {
        return [$this->form()];
    }

    protected function foreignModels(): array
    {
        return [[$this->nameModel(), $this->model()->nameId(), []]];
    }

    protected function field(): string
    {
        $model = $this->model();
        $name = $this->nameModel();
        $field = [
            $model->id() . ' as ' . $model->paramId(),
            $name->name() . ' as ' . $model->paramName(),
            $model->nameId() . ' as ' . $model->paramNameId(),
            $model->createTime() . ' as ' . $model->paramCreateTime(),
        ];
        return join(',', $field);
    }

    protected function fetch(string $field, array $where, array $values): array
    {
        $model = $this->model();
        $name = $this->nameModel();
        $sql = [
            'select',
            $field,
            'from',
            $model->table(),
            'left join',
            $name->table(),
            'on',
            $model->nameId(),
            '=',
            $name->id(),
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