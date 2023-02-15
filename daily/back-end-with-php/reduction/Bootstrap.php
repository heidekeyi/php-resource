<?php

namespace daily\reduction\Bootstrap;

include '../Autoload.php';

use daily\reduction\BaseReduction\BaseReduction;
use daily\reduction\BillReduction\BillReduction;
use daily\reduction\NameReduction\NameReduction;
use daily\reduction\SportReduction\SportReduction;
use daily\reduction\TimeReduction\TimeReduction;
use daily\reduction\UnitReduction\UnitReduction;

class Bootstrap
{
    static public function execute()
    {
        $reductions = [
            NameReduction::class,
            UnitReduction::class,
            SportReduction::class,
            BillReduction::class,
            TimeReduction::class
        ];
        $ob = new static();
        foreach ($reductions as $it) {
            $ob->calibration(new $it());
        }
    }

    private function calibration(BaseReduction $reduction)
    {
        $reduction->calibration();
    }
}

echo time() . PHP_EOL;
echo date('Y-m-d H:i:s', time() + 8 * 60 * 60) . PHP_EOL;

Bootstrap::execute();