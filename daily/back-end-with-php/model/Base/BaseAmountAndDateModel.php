<?php

namespace daily\model\base\BaseAmountAndDateModel;

use daily\model\base\BaseCategoryModel\BaseCategoryModel;
use JetBrains\PhpStorm\Pure;

class BaseAmountAndDateModel extends BaseCategoryModel
{
    #[Pure] public function amount(): string
    {
        return $this->field(__FUNCTION__);
    }

    #[Pure] public function date(): string
    {
        return $this->field(__FUNCTION__);
    }

    #[Pure] public function paramAmount(): string
    {
        return 'amount';
    }

    #[Pure] public function paramDate(): string
    {
        return 'date';
    }
}