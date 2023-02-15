<?php

namespace controller\CNameController;

use controller\IListController\IListController;
use controller\IRestController\IRestController;
use CResult\CResult;
use field\CNameField\CNameField;
use model\CNameModel\CNameModel;

class CNameController implements IListController, IRestController
{
    public function list(): CResult
    {
        $field = new CNameField();
        return new CResult([
            $field->table(false) => $field->table(true),
            $field->id(false) => $field->id(true),
            $field->createTime(false) => $field->createTime(true),
            $field->name(false) => $field->name(true)
        ]);
    }

    public function select(string $id): CResult
    {
        return $this->model()->select($id);
    }

    public function delete(string $id): CResult
    {
        return new CResult(__METHOD__);
    }

    public function update(string $id): CResult
    {
        return new CResult(__METHOD__);
    }

    public function insert(): CResult
    {
        return $this->model()->insert(['name' => time() . '']);
    }

    private function model(): CNameModel
    {
        return new CNameModel();
    }
}