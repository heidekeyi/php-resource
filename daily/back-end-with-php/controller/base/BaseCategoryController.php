<?php

namespace daily\controller\base\BaseCategoryController;

use daily\controller\base\BaseController\BaseController;
use daily\controller\base\Category\Category;
use daily\model\base\BaseCategoryModel\BaseCategoryModel;
use daily\model\base\BaseNameModel\BaseNameModel;
use daily\utils\ResponseUtil\ResponseUtil;
use daily\utils\TimeUtil\TimeUtil;

abstract class BaseCategoryController extends BaseController
{
    use ResponseUtil;
    use Category;

    abstract protected function categoryModel(): BaseNameModel;

    abstract protected function model(): BaseCategoryModel;

    protected function referenceModels(): array
    {
        return [];
    }

    protected function sqlCategory(): string
    {
        return $this->initSqlCategory(
            $this->model(),
            $this->categoryModel(),
            $this->nameModel()
        );
    }

    protected function queryCategoryName(array $where, array $values): array
    {
        $field = $this->model()->paramCategoryName();
        $category = $this->initLike($field);
        if ($category !== '') {
            if (!empty($where)) {
                $where[] = 'and';
            }
            $where = [...$where, 'c.' . $field, 'like ?'];
            $values[] = $category;
        }
        return [$where, $values];
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
            '(' . $this->sqlCategory() . ')' . ' as c',
            'on',
            $model->categoryId() . '=c.' . $model->paramCategoryId(),
            ...$where
        ];
        $sql = join(' ', $sql);
        return $this->db()->select($sql, $values);
    }

    protected function categoryDate(string $field, string $fieldBegin, string $fieldEnd): array
    {
        $where = [];
        $values = [];
        $value = $this->params()
            ->init($field, '')
            ->pass()
            ->result()[$field];
        if ($value !== '') {
            if (!preg_match('/^\d{4}(-\d{1,2}){0,2}$/', $value)) {
                $this->responseError($field . ' = ' . $value . ' is not match date format');
            }
            list($beg, $end) = (new TimeUtil())->range($field, $value);
            $timezone = $this->params()->timezone();
            $beg = (+$beg + $timezone) . '';
            $end = (+$end + $timezone) . '';
            $where = [$fieldBegin, '>=? and', $fieldEnd, '<?'];
            $values = [$beg, $end];
        }
        return [$where, $values];
    }
}