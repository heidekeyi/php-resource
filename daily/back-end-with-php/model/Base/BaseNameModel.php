<?php

namespace daily\model\base\BaseNameModel;

use daily\model\NameModel\NameModel;
use JetBrains\PhpStorm\Pure;

class BaseNameModel extends NameModel
{
    #[Pure] public function nameId(): string
    {
        return $this->field(__FUNCTION__);
    }

    public function paramNameId(): string
    {
        return 'nameId';
    }
}