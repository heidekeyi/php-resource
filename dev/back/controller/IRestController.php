<?php

namespace controller\IRestController;

use CResult\CResult;

interface IRestController
{
    public function insert(): CResult;

    public function delete(string $id): CResult;

    public function update(string $id): CResult;

    public function select(string $id): CResult;
}