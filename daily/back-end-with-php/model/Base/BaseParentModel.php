<?php

namespace daily\model\base\BaseParentModel;

use daily\model\base\BaseNameModel\BaseNameModel;
use JetBrains\PhpStorm\Pure;

class BaseParentModel extends BaseNameModel
{
    #[Pure] public function parentName(): string
    {
        return $this->field(__FUNCTION__);
    }

    #[Pure] public function parentId(): string
    {
        return $this->field(__FUNCTION__);
    }

    public function paramParentName(): string
    {
        return 'parentName';
    }

    public function paramParentId(): string
    {
        return 'parentId';
    }

}