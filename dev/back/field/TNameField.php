<?php

namespace field\TNameField;

use field\TField\TField;

trait TNameField
{
    use TField;

    public function name(bool $complete): string
    {
        return $this->complete(__FUNCTION__, $complete);
    }
}