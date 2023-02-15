<?php


namespace controller\IListController;

use CResult\CResult;

interface IListController
{
    public function list(): CResult;
}