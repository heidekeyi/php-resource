<?php

namespace daily\reduction\SportReduction;

use daily\model\SportCategoryModel\SportCategoryModel;
use daily\reduction\BaseSportReduction\BaseSportReduction;

class SportReduction extends BaseSportReduction
{
    public function calibration()
    {
        $this->impl(new SportCategoryModel(), $this->sport()->categoryId());
    }
}