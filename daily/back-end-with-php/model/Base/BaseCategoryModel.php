<?php

namespace daily\model\base\BaseCategoryModel;

use daily\model\base\BaseModel\BaseModel;
use JetBrains\PhpStorm\Pure;

class BaseCategoryModel extends BaseModel
{
    #[Pure] public function categoryId(): string
    {
        return $this->field(__FUNCTION__);
    }

    #[Pure] public function categoryName(): string
    {
        return $this->field(__FUNCTION__);
    }

    #[Pure] public function paramCategoryId(): string
    {
        return 'categoryId';
    }

    #[Pure] public function paramCategoryName(): string
    {
        return 'categoryName';
    }
}