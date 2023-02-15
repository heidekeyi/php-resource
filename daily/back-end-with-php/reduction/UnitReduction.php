<?php


namespace daily\reduction\UnitReduction;

use daily\model\UnitModel\UnitModel;
use daily\reduction\BaseSportReduction\BaseSportReduction;

class UnitReduction extends BaseSportReduction
{
    public function calibration()
    {
        $this->impl(new UnitModel(), $this->sport()->unitId());
    }
}