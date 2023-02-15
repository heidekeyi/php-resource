<?php

namespace CValidator;

use CResult\CResult;

class CValidator
{
    public function __construct(string $key, string $value)
    {
        $this->key = $key;
        $this->value = $value;
        $this->result = new CResult('');
    }

    public function empty(): CValidator
    {
        if (!$this->result->getStatus()) {
            return $this;
        }
        $value = $this->value;
        if (empty($value)) {
            $this->result->error($this->message([$this->key, 'is', __FUNCTION__]));
        } else {
            $this->result->setData($value);
        }
        return $this;
    }

    public function regular(string $pattern): CValidator
    {
        if (!$this->result->getStatus()) {
            return $this;
        }
        $value = $this->value;
        if (!preg_match($pattern, $value)) {
            $this->result->error($this->message([$this->key, 'mismatch', __FUNCTION__]));
        } else {
            $this->result->setData($value);
        }
        return $this;
    }

    public function result(): CResult
    {
        return $this->result;
    }

    private function message(array $pieces): string
    {
        return implode(' ', $pieces);
    }

    private string $key;
    private string $value;
    private CResult $result;
}
