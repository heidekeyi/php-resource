<?php

namespace field\TCategoryField;

use field\TField\TField;

trait TCategoryField
{
    use TField;

    public function categoryName(bool $complete): string
    {
        return $this->complete(__FUNCTION__, $complete);
    }

    public function categoryId(bool $complete): string
    {
        return $this->complete(__FUNCTION__, $complete);
    }
}