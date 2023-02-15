<?php

namespace field\TParentField;

use field\TField\TField;

trait TParentField
{
    use TField;

    public function parentId(bool $complete): string
    {
        return $this->complete(__FUNCTION__, $complete);
    }

    public function parentName(bool $complete): string
    {
        return $this->complete(__FUNCTION__, $complete);
    }
}