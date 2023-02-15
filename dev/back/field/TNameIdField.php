<?php

namespace field\TNameIdField;

use field\TField\TField;

trait TNameIdField
{
    use TField;

    public function nameId(bool $complete): string
    {
        return $this->complete(__FUNCTION__, $complete);
    }
}