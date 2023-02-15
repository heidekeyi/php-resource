<?php

namespace CResult;

class CResult
{
    public function __construct(string|array $data, string $message = '', bool $status = true)
    {
        $this->status = $status;
        $this->data = $data;
        $this->message = $message;
    }

    public function getStatus(): bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): CResult
    {
        $this->status = $status;
        return $this;
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    public function setMessage(string $message): CResult
    {
        $this->message = $message;
        return $this;
    }

    public function getData(): string|array
    {
        return $this->data;
    }

    public function setData(string|array $data): CResult
    {
        $this->data = $data;
        return $this;
    }

    public function error(string $message): CResult
    {
        return $this->setMessage($message)->setStatus(false);
    }

    public function __serialize(): array
    {
        return $this->serialize();
    }

    public function serialize(): array
    {
        return [
            'status' => $this->getStatus(),
            'data' => $this->getData(),
            'message' => $this->getMessage()
        ];
    }

    private bool $status;
    private string $message;
    private string|array $data;
}