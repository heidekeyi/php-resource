<?php

namespace field\TQuantityField;

use field\TCategoryField\TCategoryField;

trait TQuantityField
{
    use TCategoryField;

    public function quantity(bool $complete): string
    {
        return $this->complete(__FUNCTION__, $complete);
    }
}