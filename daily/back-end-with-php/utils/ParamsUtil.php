<?php


namespace daily\utils\ParamsUtil;

use daily\utils\RequestUtil\RequestUtil;
use daily\utils\TimeUtil\TimeUtil;
use JetBrains\PhpStorm\Pure;

class ParamsUtil
{
    use RequestUtil;

    private string $field = '';
    private string $value = '';
    private array $result = [];
    private array $data;

    public function __construct()
    {
        $this->data = $this->requestMethod() === 'get'
            ? $_GET
            : $this->form();
    }

    public function init(string $field, string $defaultValue): static
    {
        $this->field = $field;
        $value = $this->data[$field] ?? $defaultValue;
        $value .= '';
        if ($value === '') {
            $value = $defaultValue;
        }
        $this->value = trim($value);
        return $this;
    }

    public function result(): array
    {
        return $this->result;
    }

    public function pass(): static
    {
        $this->result[$this->field] = $this->value;
        return $this;
    }

    public function existValidate(): static
    {
        if (!key_exists($this->field, $this->data)) {
            $this->responseError('params: missing ' . $this->field);
        }
        return $this;
    }

    public function emptyValidate(): static
    {
        if ($this->value === '') {
            $this->responseError('params: ' . $this->field . ' is empty');
        }
        return $this;
    }

    public function maxLengthValidate(int $max): static
    {
        if (mb_strlen($this->value) > $max) {
            $this->responseError('params: max ' . $this->field . ' length is ' . $max);
        }
        return $this;
    }

    public function minLengthValidate(int $min): static
    {
        if (mb_strlen($this->value) < $min) {
            $this->responseError('params: min ' . $this->field . ' length is ' . $min);
        }
        return $this;
    }

    public function intValidate(): static
    {
        if (!preg_match('/^-?\d+$/', $this->value)) {
            $this->responseError('params: ' . $this->field . ' must be integer');
        }
        return $this;
    }

    public function maxValueValidate(int $max = 2147483647): static
    {
        if (+$this->value > $max) {
            $this->responseError('params: max ' . $this->field . ' value is ' . $max);
        }
        return $this;
    }

    public function minValueValidate(int $min = -2147483647): static
    {
        if (+$this->value < $min) {
            $this->responseError('params: min ' . $this->field . ' value is ' . $min);
        }
        return $this;
    }

    public function dateValidate(): static
    {
        if (!preg_match('/^\d{4}(-\d{1,2}){2}$/', $this->value)) {
            $this->responseError('params: ' . $this->field . ' = ' . $this->value . ' is a not date format');
        }
        $this->value = (new TimeUtil())->timestamp($this->field, $this->value);
        return $this;
    }

    public function timeValidate(): static
    {
        $this->value = $this->timeUtil()->timestamp($this->field, $this->value);
        return $this;
    }

    #[Pure] private function timeUtil(): TimeUtil
    {
        return new TimeUtil();
    }

    public function timezone(): int
    {
        $field = 'timezone';
        $value = $_GET[$field] ?? '0';
        if (!preg_match('/^-?\d+$/', $value)) {
            $message = [$field, '=', $value, 'is not integer'];
            $this->responseError(join(' ', $message));
        }
        return +$value;
    }

}