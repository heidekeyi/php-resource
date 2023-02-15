<?php

namespace controller\time\CTimeRecordController;

use controller\IListController\IListController;
use controller\IRestController\IRestController;
use CResult\CResult;
use field\CTimeRecordField\CTimeRecordField;

class CTimeRecordController implements IRestController, IListController
{
    public function list(): CResult
    {
        $field = new CTimeRecordField();
        return new CResult([
            $field->table(false) => $field->table(true),
            $field->id(false) => $field->id(true),
            $field->createTime(false) => $field->id(true),
            $field->categoryName(false) => $field->categoryName(true),
            $field->categoryId(false) => $field->categoryId(true),
            $field->date(false) => $field->date(true),
            $field->beginTime(false) => $field->beginTime(true),
            $field->endTime(false) => $field->endTime(true)
        ]);
    }

    public function select(): CResult
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

    public function insert(): CResult
    {
        return new CResult(__METHOD__);
    }
}