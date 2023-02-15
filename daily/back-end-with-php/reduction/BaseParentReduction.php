<?php

namespace daily\reduction\BaseParentReduction;

use daily\model\base\BaseModel\BaseModel;
use daily\model\base\BaseParentModel\BaseParentModel;
use daily\reduction\BaseReduction\BaseReduction;

abstract class BaseParentReduction extends BaseReduction
{
    protected function impl(BaseModel $baseModel, BaseParentModel $parentModel, string $field)
    {
        $parentIds = [];
        foreach ($this->all($parentModel) as $it) {
            $value = $it[$parentModel->parentId()];
            $parentIds[$value] = $value;
        }
        $parentIds = array_values($parentIds);
        if (empty($parentIds)) {
            $result = $this->all($parentModel);
        } else {
            $ids = [];
            foreach ($this->all($baseModel) as $it) {
                $value = $it[$field];
                $ids[$value] = $value;
            }
            foreach ($parentIds as $it) {
                $ids[$it] = $it;
            }
            $ids=  array_values($ids);
            $result=$this->select($parentModel, $ids);
        }
        $this->message($parentModel, $result);
    }
}