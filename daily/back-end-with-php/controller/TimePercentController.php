<?php

namespace daily\controller\TimePercentController;

use daily\controller\base\BaseTimeCalibrationController\BaseTimeCalibrationController;

class TimePercentController extends BaseTimeCalibrationController
{
    protected function fetch(): array
    {
        $result = [];
        foreach ($this->amount() as $item) {
            if ($item['pid'] === '0') {
                $result[] = $item;
            }
        }
        return $result;
    }
}