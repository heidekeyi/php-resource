<?php

namespace daily\controller\base\BaseQueryNameController;

use daily\controller\base\BaseController\BaseController;

abstract class BaseQueryNameController extends BaseController
{
    protected function queryName(array $where, array $values): array
    {
        $model = $this->nameModel();
        $value = $this->initLike($model->paramName());
        if ($value !== '') {
            if (!empty($where)) {
                $where[] = 'and';
            }
            $values[] = $value;
            $where = [...$where, $model->name(), 'like ?'];
        }
        return [$where, $values];
    }
}