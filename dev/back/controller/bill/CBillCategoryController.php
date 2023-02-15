<?php

namespace controller\bill\CBillCategoryController;

use controller\IListController\IListController;
use controller\IRestController\IRestController;
use CResult\CResult;
use field\CBillCategoryField\CBillCategoryField;

class CBillCategoryController implements IListController, IRestController
{

    public function list(): CResult
    {
        $field = new CBillCategoryField();
        return new CResult([
            $field->table(false) => $field->table(true),
            $field->id(false) => $field->id(true),
            $field->createTime(false) => $field->id(true),
            $field->name(false) => $field->name(true),
            $field->nameId(false) => $field->nameId(true),
            $field->parentName(false) => $field->parentName(true),
            $field->parentId(false) => $field->parentId(true)
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