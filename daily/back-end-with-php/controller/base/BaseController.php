<?php

namespace daily\controller\base\BaseController;

use daily\controller\base\Controller\Controller;
use daily\model\base\BaseModel\BaseModel;
use daily\model\NameModel\NameModel;
use daily\utils\ResponseUtil\ResponseUtil;
use daily\validator\ReferenceValidator\ReferenceValidator;
use daily\validator\ForeignValidator\ForeignValidator;
use daily\validator\IdValidator\IdValidator;
use daily\validator\UniqueValidator\UniqueValidator;
use JetBrains\PhpStorm\NoReturn;

abstract class BaseController
{
    private static string $list = 'list';
    private static string $pageIndex = 'pageIndex';
    private static string $pageSize = 'pageSize';
    private static string $prevPageIndex = 'prevPageIndex';
    private static string $nextPageIndex = 'nextPageIndex';
    private static string $totalPage = 'totalPage';

    abstract protected function field(): string;

    abstract protected function fetch(string $field, array $where, array $values): array;

    abstract protected function initQuery(): array;

    abstract protected function model(): BaseModel;

    abstract protected function form(): array;

    abstract protected function uniqueKeys(): array;

    abstract protected function referenceModels(): array;

    abstract protected function foreignModels(): array;

    use ResponseUtil;
    use Controller;

    private array $query = [];
    private NameModel $nameModel;

    protected function nameModel(): NameModel
    {
        if (empty($this->nameModel)) {
            $this->nameModel = new NameModel();
        }
        return $this->nameModel;
    }

    #[NoReturn] public function select(string $id)
    {
        if ($id !== '') {
            $this->idValidate($id);
            $result = $this->fetchOne($id);
        } else {
            $result = $this->fetchPage();
        }
        $this->responseSuccess($this->model()->table() . ': select success', $result);
    }

    #[NoReturn] public function insert()
    {
        $this->updateValidate();
        $model = $this->model();
        $form = $this->form();
        $form[$model->createTime()] = time() . '';
        $sql = ['insert into', $model->table(), '('];
        $values = array_values($form);
        $fields = array_keys($form);
        $sql[] = implode(', ', $fields);
        $sql[] = ')values(';
        $str = str_repeat(',?', count($fields));
        $sql[] = preg_replace('/^,/', '', $str);
        $sql[] = ')';
        $result = $this->db()->insert(implode(' ', $sql), $values);
        $this->responseSuccess($model->table() . ': insert success', $result);
    }


    #[NoReturn] public function update(string $id)
    {
        $this->updateValidate($id);
        $model = $this->model();
        $form = $this->form();
        $fields = [];
        $values = [];
        foreach ($form as $field => $value) {
            $fields[] = $field . '=?';
            $values[] = $value;
        }
        $sql = [
            'update', $model->table(),
            'set', implode(',', $fields),
            'where', $model->id(), '=?'
        ];
        $values[] = $id;
        $this->db()->update(implode(' ', $sql), $values);
        $message = [$model->table() . ':', $model->paramId(), '=', $id, 'update success'];
        $message = join(' ', $message);
        $this->responseSuccess($message, '');
    }

    #[NoReturn] public function delete(string $id)
    {
        $this->idValidate($id);
        $validator = (new ReferenceValidator())->id($id);
        foreach ($this->referenceModels() as $item) {
            list($model, $field) = $item;
            $validator->model($model)->field($field)->validate();
        }
        $model = $this->model();
        $sql = [
            'delete from',
            $model->table(),
            'where',
            $model->id(),
            '=?'
        ];
        $sql = implode(' ', $sql);
        $this->db()->delete($sql, [$id]);
        $message = [$model->table() . ':', $model->paramId(), '=', $id, 'delete success'];
        $message = join(' ', $message);
        $this->responseSuccess($message, '');
    }

    private function idValidate(string $id)
    {
        (new IdValidator())->model($this->model())->id($id)->validate();
    }

    private function updateValidate(string $id = '')
    {
        $model = $this->model();
        $form = $this->form();
        if ($id !== '') {
            $this->idValidate($id);
        }
        (new UniqueValidator())
            ->uniques($this->uniqueKeys())
            ->model($model)
            ->id($id)
            ->validate();
        $validator = (new ForeignValidator());
        foreach ($this->foreignModels() as $item) {
            list($model, $field, $excludes) = $item;
            $value = $form[$field];
            if (!in_array($value, $excludes)) {
                $validator->model($model)->id($value)->validate();
            }
        }
        $this->customValidate($id);
    }

    protected function customValidate(string $id)
    {

    }

    private function pageIndex(): string
    {
        $field = static::$pageIndex;
        return $this->params()
            ->init($field, '1')
            ->intValidate()
            ->minValueValidate(1)
            ->maxValueValidate()
            ->pass()
            ->result()[$field];
    }

    private function pageSize(): string
    {
        $field = static::$pageSize;
        return $this->params()
            ->init($field, '15')
            ->intValidate()
            ->maxLengthValidate(6)
            ->minValueValidate(1)
            ->maxValueValidate(999999)
            ->pass()
            ->result()[$field];
    }

    protected function initLike(string $field): string
    {
        $value = $this->params()
            ->init($field, '')
            ->maxLengthValidate(32)
            ->pass()
            ->result()[$field];
        $res = '';
        if ($value !== '') {
            $res = "%$value%";
        }
        return $res;
    }

    private function fetchOne(string $id): array
    {
        $where = ['where', $this->model()->id(), '=?'];
        $values = [$id];
        $field = $this->field();
        return $this->fetch($field, $where, $values)[0];
    }

    private function total(): string
    {
        $this->query = $this->initQuery();
        list($where, $values) = $this->query;
        $field = 'amount';
        return $this->fetch('count(*) as ' . $field, $where, $values)[0][$field];
    }

    private function list(int $pageIndex, int $pageSize): array
    {
        list($where, $values) = $this->query;
        $where = [
            ...$where,
            'order by',
            $this->model()->id(),
            'desc',
            "limit",
            ($pageIndex - 1) * $pageSize . ',' . $pageSize
        ];
        return $this->fetch($this->field(), $where, $values);
    }

    private function fetchPage(): array
    {
        $pageIndex = +$this->pageIndex();
        $pageSize = +$this->pageSize();
        $total = max(+$this->total(), 1);
        $totalPage = ceil($total / $pageSize);
        $prevPageIndex = max(1, $pageIndex - 1);
        $nextPageIndex = min($totalPage, $pageIndex + 1);
        $pageIndex = min($totalPage, $pageIndex);
        return [
            static::$pageSize => $pageSize . '',
            static::$pageIndex => $pageIndex . '',
            static::$nextPageIndex => $nextPageIndex . '',
            static::$prevPageIndex => $prevPageIndex . '',
            static::$totalPage => $totalPage . '',
            static::$list => $this->list($pageIndex, $pageSize)
        ];
    }

    protected function composeQuery(array $query): array
    {
        list($where, $values) = $query;
        if (!empty($where)) {
            $where = ['where', ...$where];
        }
        return [$where, $values];
    }
}