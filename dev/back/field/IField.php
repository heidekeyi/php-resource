<?php

namespace field\IField;

interface IField
{
    public function table(bool $complete): string;

    public function id(bool $complete): string;

    public function createTime(bool $complete): string;
}