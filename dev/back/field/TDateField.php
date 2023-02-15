<?php

namespace field\TDateField;

use field\TField\TField;

trait TDateField
{
    use TField;

    public function date(bool $complete): string
    {
        return $this->complete(__FUNCTION__, $complete);
    }
}