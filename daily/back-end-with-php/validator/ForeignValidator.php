<?php


namespace daily\validator\ForeignValidator;

use daily\validator\IdValidator\IdValidator;
use JetBrains\PhpStorm\Pure;

class ForeignValidator extends IdValidator
{
    #[Pure] protected function errorMessage(): string
    {
        $model = $this->model;
        $message = [
            $model->table() . ':',
            $model->paramId(),
            '=',
            $this->id,
            'as foreign key but not exist'
        ];
        return join(' ', $message);
    }
}