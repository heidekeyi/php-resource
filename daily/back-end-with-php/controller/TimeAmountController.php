<?php

namespace daily\controller\TimeAmountController;

use daily\controller\base\BaseTimeCalibrationController\BaseTimeCalibrationController;

class TimeAmountController extends BaseTimeCalibrationController
{
    protected function fetch(): array
    {
        return $this->amount();
    }
}