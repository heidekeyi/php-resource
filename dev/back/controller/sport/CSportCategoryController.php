<?php

namespace controller\sport\CSportCategoryController;

use controller\IListController\IListController;
use controller\IRestController\IRestController;
use CResult\CResult;
use field\CSportCategoryField\CSportCategoryField;

class CSportCategoryController implements IRestController, IListController
{

    public function list(): CResult
    {
        $field = new CSportCategoryField();
        return new CResult([
            $field->table(false) => $field->table(true),
            $field->id(false) => $field->id(true),
            $field->createTime(false) => $field->id(true),
            $field->name(false) => $field->name(true),
            $field->nameId(false) => $field->nameId(true),
            $field->unitName(false) => $field->unitName(true),
            $field->unitId(false) => $field->unitId(true)
        ]);
    }

    public function insert(): CResult
    {
        return new CResult(__METHOD__);
    }

    public function delete(): CResult
    {
        return new CResult(__METHOD__);
    }

    public function update(): CResult
    {
        return new CResult(__METHOD__);
    }

    public function select(): CResult
    {
        return new CResult(__METHOD__);
    }
}