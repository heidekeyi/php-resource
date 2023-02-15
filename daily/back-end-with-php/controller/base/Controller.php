<?php

namespace daily\controller\base\Controller;

use daily\utils\DbUtil\DbUtil;
use daily\utils\ParamsUtil\ParamsUtil;

trait Controller
{
    protected function db(): DbUtil
    {
        return new DbUtil();
    }

    protected function params(): ParamsUtil
    {
        return new ParamsUtil();
    }
}