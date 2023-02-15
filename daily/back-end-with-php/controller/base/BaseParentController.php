<?php

namespace daily\controller\base\BaseParentController;

use daily\controller\base\BaseQueryNameController\BaseQueryNameController;
use daily\model\base\BaseParentModel\BaseParentModel;
use daily\utils\ResponseUtil\ResponseUtil;

abstract class BaseParentController extends BaseQueryNameController
{
    abstract protected function model(): BaseParentModel;

    use ResponseUtil;

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
                ->init($model->paramParentId(), '')
                ->existValidate()
                ->emptyValidate()
                ->intValidate()
                ->minValueValidate(0)
                ->maxValueValidate()
                ->pass()
                ->result();
            $this->form = [
                $model->nameId() => $form[$model->paramNameId()],
                $model->parentId() => $form[$model->paramParentId()]
            ];
        }
        return $this->form;
    }

    protected function uniqueKeys(): array
    {
        $model = $this->model();
        $form = $this->form();
        $field = $model->nameId();
        return [[$field => $form[$field]]];
    }

    protected function foreignModels(): array
    {
        $model = $this->model();
        return [
            [$this->nameModel(), $model->nameId(), []],
            [$model, $model->parentId(), ['0']]
        ];
    }

    private function sqlParent(): string
    {
        $name = $this->nameModel();
        $model = $this->model();
        $field = [
            $model->id() . ' as id',
            $name->name() . ' as name',
        ];
        $sql = [
            'select',
            join(',', $field),
            'from',
            $model->table(),
            'left join',
            $name->table(),
            'on',
            $name->id() . '=' . $model->nameId(),
        ];
        return join(' ', $sql);
    }

    private function sqlName(string $field): string
    {
        $name = $this->nameModel();
        $model = $this->model();
        $sql = [
            'select',
            $field,
            'from',
            $model->table(),
            'left join',
            $name->table(),
            'on',
            $name->id() . '=' . $model->nameId(),
        ];
        return join(' ', $sql);
    }

    protected function field(): string
    {
        $model = $this->model();
        $name = $this->nameModel();
        $field = [
            $model->id() . ' as ' . $model->paramId(),
            $model->createTime() . ' as ' . $model->paramCreateTime(),
            $model->nameId() . ' as ' . $model->paramNameId(),
            $name->name() . ' as ' . $model->paramName(),
            $model->parentId() . ' as ' . $model->paramParentId(),
            "IFNULL(p.name,'(null)') as " . $model->paramParentName()
        ];
        return join(',', $field);
    }

    protected function fetch(string $field, array $where, array $values): array
    {
        $model = $this->model();
        $sqlParent = $this->sqlParent();
        $sqlName = $this->sqlName($field);
        $sql = [
            $sqlName,
            'left join',
            '(' . $sqlParent . ') as p',
            'on',
            'p.id = ' . $model->parentId(),
            ...$where
        ];
        $sql = join(' ', $sql);
        return $this->db()->select($sql, $values);
    }

    protected function initQuery(): array
    {
        $values = [];
        $where = [];
        $model = $this->model();
        $valueParent = $this->initLike($model->paramParentName());
        if ($valueParent !== '') {
            if ($valueParent === "%(null)%") {
                $where = [$model->parentId(), '=?'];
                $valueParent = '0';
            } else {
                $where = ['p.name like ?'];
            }
            $values[] = $valueParent;
        }
        return $this->composeQuery($this->queryName($where, $values));
    }

    protected function customValidate(string $id)
    {
        if ($id === '') {
            return;
        }
        $model = $this->model();
        $result = $this->form();
        if ($result[$model->parentId()] === $id) {
            $message = [
                $model->paramId(),
                '=',
                $id,
                '&&',
                $model->paramParentId(),
                '=',
                $id,
                'make no sense',
            ];
            $this->responseError(join(' ', $message));
        }
        while (true) {
            $pid = $result[$model->parentId()];
            $sql = [
                'select * from',
                $model->table(),
                'where',
                $model->id(),
                '=?'
            ];
            $sql = join(' ', $sql);
            $result = $this->db()->select($sql, [$pid]);
            if (empty($result)) {
                break;
            }
            $result = $result[0];
            if ($result[$model->id()] === $id) {
                $message = [
                    $model->paramParentId(),
                    '=',
                    $this->form()[$model->parentId()],
                    'and',
                    $model->id(),
                    '=',
                    $id,
                    'combine a loop chain'
                ];
                $this->responseError(join(' ', $message));
            }
        }
    }
}