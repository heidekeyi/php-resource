<?php

namespace controller\bill\CBillRecordController;

use controller\IListController\IListController;
use controller\IRestController\IRestController;
use CResult\CResult;
use field\CBillRecordField\CBillRecordField;

class CBillRecordController implements IListController, IRestController
{

    public function list(): CResult
    {
        $field = new CBillRecordField();
        return new CResult([
            $field->table(false) => $field->table(true),
            $field->id(false) => $field->id(true),
            $field->createTime(false) => $field->id(true),
            $field->categoryName(false) => $field->categoryName(true),
            $field->categoryId(false) => $field->categoryId(true),
            $field->quantity(false) => $field->quantity(true),
            $field->date(false) => $field->date(true)
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